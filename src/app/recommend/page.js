'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RecommendPage() {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement API call to analyze URL and get font recommendations
      const response = await fetch('/api/analyze-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      if (!response.ok) throw new Error('Failed to analyze URL')
      
      const data = await response.json()
      router.push(`/recommend/result?id=${data.resultId}`)
    } catch (error) {
      console.error('Error:', error)
      // TODO: Implement error handling UI
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        웹사이트 URL로 폰트 추천받기
      </h1>
      
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="url" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              분석할 웹사이트 주소를 입력해주세요
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isLoading ? '분석중...' : '폰트 추천받기'}
          </button>
        </form>
      </div>
    </div>
  )
} 