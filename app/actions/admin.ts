'use server'

import { createClient } from '@supabase/supabase-js'
import { createClient as createServerSupabase } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// Initialize Supabase Admin Client (Service Role)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
)

export async function createUser(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const fullName = formData.get('fullName') as string
    const role = formData.get('role') as string
    const code = formData.get('code') as string

    try {
        // 1. Create Auth User
        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                full_name: fullName,
                role, // We still keep this for metadata
                code
            },
        })

        if (authError) throw authError
        if (!authData.user) throw new Error('User created but no ID returned')

        // 2. Manually Create Profile (Bypassing Trigger issues)
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .insert({
                id: authData.user.id,
                full_name: fullName,
                role: role, // This assumes 'role' string matches the enum exactly
                email: email,
                code: code
            })

        if (profileError) {
            // If profile fails, we should ideally delete the auth user or log it
            console.error('Error creating profile for user:', profileError)
            // Attempt cleanup (optional, but good practice)
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id)
            throw new Error(`Profile creation failed: ${profileError.message}`)
        }

        revalidatePath('/dashboard/admin')
        return { success: true, message: 'User created successfully' }
    } catch (error: any) {
        console.error('Error creating user:', JSON.stringify(error, null, 2))
        return { success: false, message: error.message || 'Unknown error creating user' }
    }
}

export async function toggleAssignment(documentId: string, role: string, shouldAssign: boolean) {
    const supabase = await createServerSupabase()

    try {
        if (shouldAssign) {
            // INSERT (ignore if exists, but our unique constraint will throw error if we don't handle it)
            // Since we use controlled inputs, simple insert is fine. Or upsert.
            const { error } = await supabase
                .from('document_assignments')
                .upsert({
                    document_id: documentId,
                    role: role
                }, { onConflict: 'document_id, role' })

            if (error) throw error
        } else {
            // DELETE
            const { error } = await supabase
                .from('document_assignments')
                .delete()
                .eq('document_id', documentId)
                .eq('role', role)

            if (error) throw error
        }

        revalidatePath('/dashboard/admin')
        return { success: true }
    } catch (error: any) {
        console.error('Error toggling assignment:', error)
        return { success: false, message: error.message }
    }
}


export async function deleteDocument(documentId: string) {
    const supabase = await createServerSupabase()

    try {
        // First get the file path to delete from storage
        const { data: doc } = await supabase.from('documents').select('file_path').eq('id', documentId).single()

        if (doc) {
            await supabase.storage.from('price_lists').remove([doc.file_path])
        }

        const { error } = await supabase.from('documents').delete().eq('id', documentId)
        if (error) throw error

        revalidatePath('/dashboard/admin')
        return { success: true }
    } catch (error: any) {
        return { success: false, message: error.message }
    }
}

export async function assignDocument(formData: FormData) {
    const role = formData.get('role') as string
    const documentId = formData.get('documentId') as string

    // Validate inputs
    if (!role || !documentId) {
        return { success: false, message: 'Role and Document ID are required' }
    }

    const supabase = await createServerSupabase()

    try {
        const { error } = await supabase
            .from('document_assignments')
            .upsert({
                document_id: documentId,
                role: role
            }, { onConflict: 'document_id, role' })

        if (error) throw error

        revalidatePath('/dashboard/admin')
        return { success: true, message: 'Document assigned successfully' }
    } catch (error: any) {
        console.error('Error assigning document:', error)
        return { success: false, message: error.message || 'Unknown error' }
    }
}

