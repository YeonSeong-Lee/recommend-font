'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const questions = [
  {
    id: 1,
    text: '어떤 종류의 프로젝트인가요?',
    options: [
      { value: 'corporate', label: '기업 웹사이트' },
      { value: 'personal', label: '개인 블로그/포트폴리오' },
      { value: 'ecommerce', label: '쇼핑몰' },
      { value: 'other', label: '기타' }
    ]
  },
  {
    id: 2,
    text: '원하는 분위기는 어떤가요?',
    options: [
      { value: 'professional', label: '전문적이고 신뢰감 있는' },
      { value: 'modern', label: '현대적이고 세련된' },
      { value: 'playful', label: '친근하고 활발한' },
      { value: 'minimal', label: '심플하고 미니멀한' }
    ]
  },
  // 추가 질문들...
]

export default function QuestionPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const router = useRouter()

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    try {
      // TODO: Implement API call to get font recommendations based on answers
      const response = await fetch('/api/analyze-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      })

      if (!response.ok) throw new Error('Failed to get recommendations')
      
      const data = await response.json()
      router.push(`/question/result?id=${data.resultId}`)
    } catch (error) {
      console.error('Error:', error)
      // TODO: Implement error handling UI
    }
  }

  const currentQuestion = questions[currentStep]

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {currentStep + 1} / {questions.length}
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-8">
          {currentQuestion.text}
        </h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              className="w-full p-4 text-left border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 