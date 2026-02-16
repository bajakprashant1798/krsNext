import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const supabase = await createClient()

        // Simple query to wake up the database
        const { data, error } = await supabase
            .from('profiles')
            .select('count')
            .limit(1)
            .single()

        if (error) {
            console.error('Keep-alive ping failed:', error)
            return NextResponse.json({ success: false, error: error.message }, { status: 500 })
        }

        return NextResponse.json({
            success: true,
            message: 'Supabase is active',
            timestamp: new Date().toISOString()
        })
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }
}
