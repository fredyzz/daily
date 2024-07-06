'use client'

import { askQuestion } from '@/services/api'
import { useState } from 'react'

const Question = () => {
  const [questionValue, setQuestionValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()

  const handleQuestionValueOnChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault()
    setQuestionValue(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const answer = await askQuestion(questionValue)

    setResponse(answer)
    setQuestionValue('')
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={questionValue}
          type="text"
          placeholder="Ask a question"
          onChange={handleQuestionValueOnChange}
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg ml-2"
          disabled={loading}
          onSubmit={handleSubmit}
        >
          Ask
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {response && <div>{response}</div>}
    </div>
  )
}

export default Question
