import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import CreateUserForm from '@/components/admin/CreateUserForm'
import UserList from '@/components/admin/UserList'

export default async function UserManagementPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return redirect('/login')

    // Verify Admin Role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return redirect('/dashboard/documents')
    }

    // Fetch all profiles (users)
    const { data: users } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">User Management</h1>
                <p className="text-zinc-400 mt-2">Create new users and view existing accounts.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <CreateUserForm />
                </div>
                <div>
                    <UserList users={users || []} />
                </div>
            </div>
        </div>
    )
}
