import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request, context) {
  try {
    // IMPORTANT: Await params in Next.js 15+
    const params = await context.params
    const id = params.id
    
    console.log('=== API Route Debug ===')
    console.log('Fetching problem with ID:', id)
    console.log('ID type:', typeof id)
    
    const { data: problem, error } = await supabase
      .from('problems')
      .select('*')
      .eq('id', id)
      .single()

    console.log('Supabase query result:', { problem, error })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Problem not found', details: error.message },
        { status: 404 }
      )
    }

    if (!problem) {
      console.error('No problem found with ID:', id)
      return NextResponse.json(
        { error: 'Problem not found' },
        { status: 404 }
      )
    }

    console.log('Problem found successfully:', problem.title)
    return NextResponse.json(problem)
    
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}