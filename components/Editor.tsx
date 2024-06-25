'use client'

import { EntryInterface } from '@/interfaces/entry'
import { updateEntry } from '@/services/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

interface EntryProps {
  entry: EntryInterface
}

const Editor = ({ entry }: EntryProps) => {
  const [text, setText] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)
  const [analysis, setAnalysis] = useState(entry.analysis)

  console.log({ analysis })
  const { mood, summary, color, subject, negative } = analysis!

  const analysisDate = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative },
  ]

  // AutoSave function
  // Note: Using this function can increase API calls to OpenAI
  useAutosave({
    data: text,
    onSave: async (_value) => {
      setIsSaving(true)
      const updatedEntry = await updateEntry(entry.id, _value)
      setAnalysis(updatedEntry.analysis)
      setIsSaving(false)
    },
  })

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value)

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isSaving && <div>Loading...</div>}
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={text}
          onChange={handleOnChange}
        />
      </div>

      <div className="border-l border-black/10">
        <div className=" px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisDate.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between px-2 py-4 border-b  border-black/10"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span>{item.value.toString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Editor
