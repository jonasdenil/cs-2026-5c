'use client'

import { useState } from 'react'

export default function SeedPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSeed = async () => {
    setLoading(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch('/api/seed-sanity', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SEED_SECRET || 'dev-secret'}`
        }
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('✅ Data successfully seeded to Sanity!')
      } else {
        setError(`❌ Error: ${data.error}`)
      }
    } catch (err) {
      setError(`❌ Connection error: ${err instanceof Error ? err.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-800 rounded-lg p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-4">Seed Sanity CMS</h1>
        
        <p className="text-gray-300 mb-6 text-sm">
          This will populate your Sanity CMS with the initial data for skills and cases.
        </p>

        <button
          onClick={handleSeed}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          {loading ? 'Seeding...' : 'Seed Data'}
        </button>

        {message && (
          <div className="mt-6 p-4 bg-green-900 text-green-200 rounded-lg text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-900 text-red-200 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}
