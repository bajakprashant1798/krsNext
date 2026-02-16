import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import UploadDocumentForm from '@/components/admin/UploadDocumentForm'
import DocumentList from '@/components/admin/DocumentList'
import UserList from '@/components/admin/UserList' // Re-using for Overview 'Recent Users'

export default async function AdminDashboard() {
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

    // Fetch documents AND their assignments
    const { data: documents } = await supabase
        .from('documents')
        .select('*, document_assignments(role)')
        .order('created_at', { ascending: false })

    // Fetch recent users for overview
    const { data: recentUsers } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Overview</h1>
                <p className="text-zinc-400 mt-2">Manage price lists and view system stats.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Col: Upload & Docs */}
                <div className="lg:col-span-2 space-y-8">
                    <UploadDocumentForm />
                    <DocumentList documents={documents || []} />
                </div>

                {/* Right Col: Quick Stats / Recent Users */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Stats</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-800/50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-white">{documents?.length || 0}</div>
                                <div className="text-xs text-zinc-500">Documents</div>
                            </div>
                            <div className="bg-zinc-800/50 p-4 rounded-lg">
                                <div className="text-2xl font-bold text-white">{recentUsers?.length || 0}</div>
                                <div className="text-xs text-zinc-500">Users (Recent)</div>
                            </div>
                        </div>
                    </div>

                    <UserList users={recentUsers || []} />
                </div>
            </div>
        </div>
    )
}
