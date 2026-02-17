import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: problems, error } = await supabase
      .from('problems')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching problems:', error)
      return NextResponse.json(
        { error: 'Failed to fetch problems' },
        { status: 500 }
      )
    }

    return NextResponse.json(problems)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}