import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

/**
 * Sign up a new user with email and password
 * @param {string} fullName - User's full name
 * @param {string} email - User's email address
 * @param {string} password - User's password (min 6 characters)
 * @returns {Promise<{data, error}>}
 */
export async function signUp(fullName, email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  })

  return { data, error }
}

/**
 * Sign in an existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<{data, error}>}
 */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

/**
 * Sign out the current user
 * @returns {Promise<{error}>}
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

/**
 * Get the current logged-in user
 * @returns {Promise<{data: {user}, error}>}
 */
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  return { data, error }
}

/**
 * Get the current session
 * @returns {Promise<{data: {session}, error}>}
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession()
  return { data, error }
}

// ============================================
// EXISTING PROBLEM FUNCTIONS (keep these)
// ============================================

export async function getProblems() {
  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .order('id', { ascending: true })
  
  if (error) throw error
  return data
}

export async function getProblemById(id) {
  const { data, error } = await supabase
    .from('problems')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function getTestCases(problemId) {
  const { data, error } = await supabase
    .from('test_cases')
    .select('*')
    .eq('problem_id', problemId)
    .order('id', { ascending: true })
  
  if (error) throw error
  return data
}

export async function createSubmission(submission) {
  const { data, error } = await supabase
    .from('submissions')
    .insert(submission)
    .select()
    .single()
  
  if (error) throw error
  return data
}

export async function getSubmissions(filters = {}) {
  let query = supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters.problemId) {
    query = query.eq('problem_id', filters.problemId)
  }

  if (filters.userId) {
    query = query.eq('user_id', filters.userId)
  }

  const { data, error } = await query
  
  if (error) throw error
  return data
}