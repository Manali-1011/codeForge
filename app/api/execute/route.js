import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// Improved JavaScript code executor
function executeJavaScript(code, input) {
  try {
    // Parse input lines
    const inputLines = input.trim().split('\n')
    
    // Create a safe execution environment
    const executeCode = new Function('input', `
      ${code}
      
      // Parse inputs
      const lines = input.split('\\n');
      
      // Try to parse each line as JSON
      const parsedInputs = lines.map(line => {
        try {
          return JSON.parse(line);
        } catch {
          return line;
        }
      });
      
      // Get the function name from the code
      const functionMatch = code.match(/function\\s+(\\w+)/);
      if (!functionMatch) {
        throw new Error('No function found in code');
      }
      const functionName = functionMatch[1];
      
      // Call the function with parsed inputs
      const result = eval(functionName)(...parsedInputs);
      
      // Return the result as JSON
      return JSON.stringify(result);
    `)
    
    const result = executeCode(input)
    return { output: result }
    
  } catch (error) {
    return { output: '', error: error.message }
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { problem_id, code, language, submission_id } = body

    console.log('Executing code for problem:', problem_id)

    if (!problem_id || !code || !language) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Fetch ALL test cases for the problem (including hidden ones)
    const { data: testCases, error: testCasesError } = await supabase
      .from('test_cases')
      .select('*')
      .eq('problem_id', problem_id)
      .order('id', { ascending: true })

    if (testCasesError || !testCases) {
      console.error('Error fetching test cases:', testCasesError)
      return NextResponse.json(
        { error: 'Failed to fetch test cases' },
        { status: 500 }
      )
    }

    console.log('Running code against', testCases.length, 'test cases')

    // Execute code against test cases
    const results = []
    let allPassed = true
    let totalRuntime = 0

    for (const testCase of testCases) {
      const startTime = Date.now()
      
      let result
      if (language === 'javascript' || language === 'typescript') {
        result = executeJavaScript(code, testCase.input)
      } else {
        result = { output: '', error: 'Language not supported yet' }
      }

      const runtime = Date.now() - startTime
      totalRuntime += runtime

      // Normalize outputs for comparison
      const actualOutput = result.output ? result.output.trim() : ''
      const expectedOutput = testCase.expected_output.trim()
      
      const passed = actualOutput === expectedOutput && !result.error

      console.log('Test case result:', {
        input: testCase.input,
        expected: expectedOutput,
        actual: actualOutput,
        passed
      })

      allPassed = allPassed && passed

      results.push({
        test_case_id: testCase.id,
        input: testCase.input,
        expected_output: testCase.expected_output,
        actual_output: result.output || '',
        passed,
        runtime,
        error: result.error,
        is_hidden: testCase.is_hidden
      })

      // Stop on first failure for hidden test cases
      if (!passed && testCase.is_hidden) {
        console.log('Failed on hidden test case, stopping execution')
        break
      }
    }

    // Determine final status
    const status = allPassed ? 'Accepted' : 
                   results.some(r => r.error) ? 'Runtime Error' : 
                   'Wrong Answer'

    console.log('Execution complete - Status:', status)

    // Update submission if submission_id is provided
    if (submission_id) {
      const { error: updateError } = await supabase
        .from('submissions')
        .update({
          status,
          runtime: Math.round(totalRuntime / results.length),
          memory: 0
        })
        .eq('id', submission_id)

      if (updateError) {
        console.error('Error updating submission:', updateError)
      }
    }

    // Return results (filter out hidden test case details)
    return NextResponse.json({
      status,
      results: results.filter(r => !r.is_hidden),
      total_tests: testCases.length,
      passed_tests: results.filter(r => r.passed).length,
      runtime: Math.round(totalRuntime / results.length)
    })
    
  } catch (error) {
    console.error('Execution error:', error)
    return NextResponse.json(
      { error: 'Code execution failed', details: error.message },
      { status: 500 }
    )
  }
}