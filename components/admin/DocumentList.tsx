'use client'

import { deleteDocument } from '@/app/actions/admin'
import { Trash2, FileText, Calendar } from 'lucide-react'
import { useState } from 'react'
import ManageAssignment from './ManageAssignment'

type Props = {
    documents: any[]
}

export default function DocumentList({ documents }: Props) {
    const [deletingId, setDeletingId] = useState<string | null>(null)

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this document?')) return

        setDeletingId(id)
        await deleteDocument(id)
        setDeletingId(null)
    }

    return (
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 h-full">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                <h2 className="text-lg font-semibold text-white">Manage Documents</h2>
                <div className="px-3 py-1 bg-zinc-800 rounded-full border border-zinc-700 text-xs text-zinc-400">
                    {documents?.length || 0} Files
                </div>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
                {documents?.map(doc => {
                    // Extract assigned roles from the joined data (requires updated fetch query in page.tsx)
                    // We assume doc.document_assignments is an array of objects { role: string }
                    const assignedRoles = doc.document_assignments?.map((a: any) => a.role).filter(Boolean) || []

                    return (
                        <div key={doc.id} className="p-4 bg-zinc-950 border border-zinc-800/50 rounded-xl group hover:border-zinc-700 transition-all shadow-sm">
                            <div className="flex justify-between items-start">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800 text-emerald-400 shadow-inner">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-zinc-100">{doc.title}</p>
                                        <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1.5 mb-3">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>Added on {new Date(doc.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDelete(doc.id)}
                                    disabled={deletingId === doc.id}
                                    className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                                    title="Delete Document"
                                >
                                    {deletingId === doc.id ? (
                                        <span className="animate-spin">⏳</span>
                                    ) : (
                                        <Trash2 className="w-4.5 h-4.5" />
                                    )}
                                </button>
                            </div>

                            <div className="mt-4 pl-[60px] pt-4 border-t border-zinc-900">
                                <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">Access Control</p>
                                <ManageAssignment documentId={doc.id} initialAssignments={assignedRoles} />
                            </div>
                        </div>
                    )
                })}
                {(!documents || documents.length === 0) && (
                    <div className="text-center py-12 text-zinc-500 bg-zinc-950/50 rounded-xl border border-dashed border-zinc-800">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No documents uploaded yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
