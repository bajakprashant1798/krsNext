'use client'

import { User, Shield, Key } from 'lucide-react'

type Props = {
    users: any[]
}

export default function UserList({ users }: Props) {
    return (

        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 h-full">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                <h2 className="text-lg font-semibold text-white">User Management</h2>
                <div className="px-3 py-1 bg-zinc-800 rounded-full border border-zinc-700 text-xs text-zinc-400">
                    {users?.length || 0} Users
                </div>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[600px] custom-scrollbar">
                {users?.map(user => (
                    <div key={user.id} className="flex justify-between items-center p-4 bg-zinc-950 border border-zinc-800/50 rounded-xl group hover:border-zinc-700 transition-all shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-zinc-900 rounded-full border border-zinc-800 text-emerald-400 shadow-inner">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">{user.full_name || 'No Name'}</p>
                                <p className="text-xs text-zinc-500 font-mono">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full border ${user.role === 'admin'
                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                }`}>
                                {user.role}
                            </span>
                        </div>
                    </div>
                ))}
                {(!users || users.length === 0) && (
                    <div className="text-center py-12 text-zinc-500 bg-zinc-950/50 rounded-xl border border-dashed border-zinc-800">
                        <User className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No users found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
