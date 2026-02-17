import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request, context) {
  try {
    // IMPORTANT: Await params in Next.js 15+
    const params = await context.params
    const id = params.id
    
    console.log('Fetching test cases for problem ID:', id)
    
    const { data: testCases, error } = await supabase
      .from('test_cases')
      .select('*')
      .eq('problem_id', id)
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching test cases:', error)
      return NextResponse.json(
        { error: 'Failed to fetch test cases' },
        { status: 500 }
      )
    }

    console.log('Test cases found:', testCases.length)
    return NextResponse.json(testCases)
    
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}