'use client'

import { useState } from 'react'
import { assignDocument } from '@/app/actions/admin'
import { Loader2, Link as LinkIcon } from 'lucide-react'

type Props = {
    documents: any[]
}

export default function DocumentAssignmentForm({ documents }: Props) {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setMessage(null)

        const result = await assignDocument(formData)

        setLoading(false)
        if (result.success) {
            setMessage({ type: 'success', text: result.message })
            const form = document.querySelector('#assignment-form') as HTMLFormElement
            form?.reset()
        } else {
            setMessage({ type: 'error', text: result.message })
        }
    }

    return (
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2 mb-6">
                <LinkIcon className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-semibold text-white">Assign Document to Role</h2>
            </div>

            <form id="assignment-form" action={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                        Select Role
                    </label>
                    <select
                        name="role"
                        required
                        className="w-full bg-zinc-800 border-zinc-700 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-white"
                    >
                        <option value="">-- Select Role --</option>
                        <option value="channel_partner">Channel Partner</option>
                        <option value="dealer">Dealer</option>
                        <option value="distributor">Distributor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                        Select Document
                    </label>
                    <select
                        name="documentId"
                        required
                        className="w-full bg-zinc-800 border-zinc-700 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 text-white"
                    >
                        <option value="">-- Select Document --</option>
                        {documents.map((doc) => (
                            <option key={doc.id} value={doc.id}>
                                {doc.title}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Assign Document'}
                </button>

                {message && (
                    <div
                        className={`p-3 rounded-lg text-sm ${message.type === 'success'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}
                    >
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    )
}
