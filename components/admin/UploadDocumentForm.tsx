'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function UploadDocumentForm() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const router = useRouter()
    const supabase = createClient()

    async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const formData = new FormData(e.currentTarget)
        const title = formData.get('title') as string
        const file = formData.get('file') as File

        if (!file) {
            setMessage({ type: 'error', text: 'Please select a file' })
            setLoading(false)
            return
        }

        try {
            // 1. Upload file to Storage
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('price_lists')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // 2. Insert metadata into Database
            const { error: dbError } = await supabase
                .from('documents')
                .insert({
                    title,
                    file_path: filePath,
                })

            if (dbError) throw dbError

            setMessage({ type: 'success', text: 'Document uploaded successfully' })
            router.refresh()
                ; (e.target as HTMLFormElement).reset()
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Upload className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Upload Price List</h2>
                    <p className="text-xs text-zinc-500">Upload a new PDF document.</p>
                </div>
            </div>

            <form onSubmit={handleUpload} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Document Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full bg-zinc-950 border border-zinc-700/50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-white placeholder-zinc-600 transition-all outline-none"
                        placeholder="e.g., Dealer Price List 2024"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        PDF File
                    </label>
                    <div className="relative">
                        <input
                            type="file"
                            name="file"
                            accept=".pdf"
                            required
                            className="w-full text-sm text-zinc-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700 file:transition-colors cursor-pointer bg-zinc-950 border border-zinc-700/50 rounded-lg pr-4 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all outline-none"
                        />
                    </div>
                    <p className="text-[10px] text-zinc-600 pl-1">Only PDF files are supported.</p>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4 transform active:scale-[0.98]"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Upload Document'}
                </button>

                {message && (
                    <div
                        className={`p-4 rounded-lg text-sm flex items-start gap-2 ${message.type === 'success'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${message.type === 'success' ? 'bg-green-400' : 'bg-red-400'}`} />
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    )
}
