'use client'

import { toggleAssignment } from '@/app/actions/admin'
import { useState } from 'react'

type Props = {
    documentId: string
    initialAssignments: string[] // List of roles currently assigned
}

const ROLES = ['channel_partner', 'dealer', 'distributor']

export default function ManageAssignment({ documentId, initialAssignments }: Props) {
    const [assignments, setAssignments] = useState<string[]>(initialAssignments)
    const [loadingRole, setLoadingRole] = useState<string | null>(null)

    async function handleToggle(role: string, checked: boolean) {
        setLoadingRole(role)
        // Optimistic update
        const newAssignments = checked
            ? [...assignments, role]
            : assignments.filter(r => r !== role)

        setAssignments(newAssignments)

        const result = await toggleAssignment(documentId, role, checked)

        if (!result.success) {
            // Revert on error
            setAssignments(assignments)
            alert('Failed to update assignment: ' + result.message)
        }
        setLoadingRole(null)
    }

    return (
        <div className="flex flex-wrap gap-2 mt-2">
            {ROLES.map(role => {
                const isAssigned = assignments.includes(role)
                const isLoading = loadingRole === role

                return (
                    <label
                        key={role}
                        className={`
                            px-2 py-1 text-xs rounded-md border cursor-pointer transition-colors select-none flex items-center gap-1
                            ${isAssigned
                                ? 'bg-blue-500/20 border-blue-500/40 text-blue-300 hover:bg-blue-500/30'
                                : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300'
                            }
                            ${isLoading ? 'opacity-50 cursor-wait' : ''}
                        `}
                    >
                        <input
                            type="checkbox"
                            className="hidden"
                            checked={isAssigned}
                            disabled={isLoading}
                            onChange={(e) => handleToggle(role, e.target.checked)}
                        />
                        {/* Format role name: channel_partner -> Channel Partner */}
                        {role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </label>
                )
            })}
        </div>
    )
}
