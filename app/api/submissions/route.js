import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const body = await request.json()
    const { problem_id, code, language, user_id } = body

    console.log('Creating submission for problem:', problem_id)

    // Validate required fields
    if (!problem_id || !code || !language) {
      return NextResponse.json(
        { error: 'Missing required fields: problem_id, code, language' },
        { status: 400 }
      )
    }

    // Insert submission with initial status
    const { data: submission, error } = await supabase
      .from('submissions')
      .insert({
        problem_id,
        code,
        language,
        user_id: user_id || 'anonymous',
        status: 'Pending',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating submission:', error)
      return NextResponse.json(
        { error: 'Failed to create submission' },
        { status: 500 }
      )
    }

    console.log('Submission created:', submission.id)
    return NextResponse.json(submission, { status: 201 })
    
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const problemId = searchParams.get('problem_id')
    const userId = searchParams.get('user_id')

    console.log('Fetching submissions - problemId:', problemId, 'userId:', userId)

    let query = supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (problemId) {
      query = query.eq('problem_id', problemId)
    }

    if (userId) {
      query = query.eq('user_id', userId)
    }

    const { data: submissions, error } = await query

    if (error) {
      console.error('Error fetching submissions:', error)
      return NextResponse.json(
        { error: 'Failed to fetch submissions' },
        { status: 500 }
      )
    }

    console.log('Submissions found:', submissions.length)
    return NextResponse.json(submissions)
    
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}