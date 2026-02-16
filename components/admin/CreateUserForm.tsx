'use client'

import { useState } from 'react'
import { createUser } from '@/app/actions/admin'
import { Loader2, UserPlus } from 'lucide-react'

export default function CreateUserForm() {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        setMessage(null)

        const result = await createUser(formData)

        setLoading(false)
        if (result.success) {
            setMessage({ type: 'success', text: result.message })
            // Reset form via DOM or state if needed, but for simplicity here we just show success
            const form = document.querySelector('form') as HTMLFormElement
            form?.reset()
        } else {
            setMessage({ type: 'error', text: result.message })
        }
    }

    return (
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                    <UserPlus className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-white">Create New User</h2>
                    <p className="text-xs text-zinc-500">Add a new user to the system.</p>
                </div>
            </div>

            <form action={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            placeholder="John Doe"
                            className="w-full bg-zinc-950 border border-zinc-700/50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-zinc-600 transition-all outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="john@example.com"
                            className="w-full bg-zinc-950 border border-zinc-700/50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-zinc-600 transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                        Password
                    </label>
                    <input
                        type="text"
                        name="password"
                        required
                        minLength={6}
                        className="w-full bg-zinc-950 border border-zinc-700/50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-zinc-600 transition-all outline-none"
                        placeholder="Initial password (min 6 chars)"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Role
                        </label>
                        <div className="relative">
                            <select
                                name="role"
                                required
                                className="w-full bg-zinc-950 border border-zinc-700/50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white appearance-none cursor-pointer hover:border-zinc-600 transition-colors outline-none"
                            >
                                <option value="channel_partner">Channel Partner</option>
                                <option value="dealer">Dealer</option>
                                <option value="distributor">Distributor</option>
                                <option value="admin">Admin</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                            Access Code
                        </label>
                        <input
                            type="text"
                            name="code"
                            placeholder="Optional verification code"
                            className="w-full bg-zinc-950 border border-zinc-700/50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder-zinc-600 transition-all outline-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed mt-4 transform active:scale-[0.98]"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create User'}
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
