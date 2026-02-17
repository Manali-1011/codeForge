'use client'

import { useEffect, useState } from 'react'

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await fetch('/api/submissions')
        if (!response.ok) throw new Error('Failed to fetch submissions')
        const data = await response.json()
        setSubmissions(data)
      } catch (err) {
        console.error('Error fetching submissions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  if (loading) return <div>Loading submissions...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recent Submissions</h1>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Problem ID</th>
            <th className="px-4 py-2 text-left">Language</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Runtime</th>
            <th className="px-4 py-2 text-left">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission.id} className="border-b">
              <td className="px-4 py-3">{submission.problem_id}</td>
              <td className="px-4 py-3">{submission.language}</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 rounded text-sm ${
                  submission.status === 'Accepted' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {submission.status}
                </span>
              </td>
              <td className="px-4 py-3">{submission.runtime || '-'}ms</td>
              <td className="px-4 py-3">
                {new Date(submission.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}