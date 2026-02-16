import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LogOut, User, FileText, Settings, Shield } from 'lucide-react'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch user profile to get role
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    const isUserAdmin = profile?.role === 'admin'

    return (
        <div className="flex h-screen bg-zinc-950 text-zinc-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 bg-zinc-900 hidden md:flex flex-col">
                <div className="p-6">
                    <h1 className="text-xl font-bold tracking-wider text-white">KRS Portal</h1>
                    <p className="text-xs text-zinc-500 mt-1">
                        {profile?.role?.toUpperCase() || 'USER'}
                    </p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                        <User className="w-5 h-5 text-zinc-400" />
                        Overview
                    </Link>

                    {isUserAdmin && (
                        <>
                            <div className="px-4 py-2 text-xs font-semibold text-zinc-600 uppercase tracking-wider">
                                Admin Controls
                            </div>
                            <Link
                                href="/dashboard/admin/users"
                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
                            >
                                <Shield className="w-5 h-5 text-zinc-400" />
                                User Management
                            </Link>
                        </>
                    )}

                    <Link
                        href="/dashboard/documents"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                        <FileText className="w-5 h-5 text-zinc-400" />
                        Documents
                    </Link>

                    <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-zinc-800 transition-colors"
                    >
                        <Settings className="w-5 h-5 text-zinc-400" />
                        Settings
                    </Link>
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <form action="/auth/signout" method="post">
                        <button
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                            type="submit"
                        >
                            <LogOut className="w-5 h-5" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <header className="flex items-center h-16 px-6 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur md:hidden">
                    <span className="font-bold">KRS Portal</span>
                </header>
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
