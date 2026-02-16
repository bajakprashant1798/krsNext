'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Lock } from 'lucide-react'

export default function SettingsPage() {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const supabase = createClient()

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            })

            if (error) throw error

            setMessage({ type: 'success', text: 'Password updated successfully' })
            setPassword('')
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-xl">
            <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

            <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-2 mb-6">
                    <Lock className="w-5 h-5 text-orange-400" />
                    <h2 className="text-lg font-semibold text-white">Update Password</h2>
                </div>

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            className="w-full bg-zinc-800 border-zinc-700 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
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
        </div>
    )
}
