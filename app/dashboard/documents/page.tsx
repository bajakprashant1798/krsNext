import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FileText, Download } from 'lucide-react'
import ManageAssignment from '@/components/admin/ManageAssignment'

export default async function DocumentsPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) return redirect('/login')

    // Fetch access to documents
    // If admin, show all. If user, show assigned.

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    const isAdmin = profile?.role === 'admin'

    let documents = [];

    if (isAdmin) {
        // Fetch with assignments for Admin
        const { data } = await supabase
            .from('documents')
            .select('*, document_assignments(role)')
            .order('created_at', { ascending: false })
        documents = data || []
    } else {
        // Join manually or use the implicit relation if setup, but simpler to just query documents that filter by RLS policy
        // Since we added the RLS policy "Users can view assigned documents", simple select should work!
        const { data } = await supabase.from('documents').select('*').order('created_at', { ascending: false })
        documents = data || []
    }

    // Generate signed URLs for the documents
    const documentsWithUrls = await Promise.all(documents.map(async (doc) => {
        const { data } = await supabase.storage.from('price_lists').createSignedUrl(doc.file_path, 3600) // 1 hour expiry

        // Extract assigned roles if admin
        // @ts-ignore
        const assignedRoles = doc.document_assignments?.map((a: any) => a.role).filter(Boolean) || []

        return {
            ...doc,
            signedUrl: data?.signedUrl,
            assignedRoles
        }
    }))

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Documents</h1>
                <p className="text-zinc-400 mt-2">View and download your assigned price lists and documents.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documentsWithUrls.map((doc) => (
                    <div key={doc.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-blue-500/10 rounded-lg">
                                <FileText className="w-8 h-8 text-blue-400" />
                            </div>
                            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                                PDF
                            </span>
                        </div>

                        <div>
                            <h3 className="font-semibold text-zinc-100 mb-1">{doc.title}</h3>
                            <p className="text-xs text-zinc-500 mb-4">
                                Added {new Date(doc.created_at).toLocaleDateString()}
                            </p>

                            <a
                                href={doc.signedUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-lg text-sm font-medium transition-colors mb-4"
                            >
                                <Download className="w-4 h-4" />
                                Download PDF
                            </a>

                            {isAdmin && (
                                <div className="pt-4 border-t border-zinc-800">
                                    <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Access Control</p>
                                    <ManageAssignment documentId={doc.id} initialAssignments={doc.assignedRoles} />
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {documentsWithUrls.length === 0 && (
                    <div className="col-span-full py-12 text-center bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
                        <p className="text-zinc-500">No documents assigned to you yet.</p>
                    </div>
                )}
            </div>


            {/* DEBUG SECTION - TO BE REMOVED */}
            {/* <div className="mt-12 p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-500 overflow-auto">
                <p className="font-bold text-zinc-400 mb-2">Debug Info (Share screenshot if issues persist):</p>
                <div className="grid grid-cols-2 gap-2">
                    <div>User ID: {user.id}</div>
                    <div>Profile Role: {profile?.role || 'null'}</div>
                    <div>IsAdmin: {String(isAdmin)}</div>
                    <div>Docs Found: {documents.length}</div>
                    <div className="col-span-2 mt-2">
                        Query: filter by role = {profile?.role}
                    </div>
                </div>
            </div> */}
        </div >
    )
}
