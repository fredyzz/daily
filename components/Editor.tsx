'use client'

import { EntryInterface } from '@/interfaces/entry'
import { updateEntry } from '@/services/api'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'

interface EditorProps {
  entry: EntryInterface
}

const Editor = ({ entry }: EditorProps) => {
  const [text, setText] = useState(entry.content)
  const [isSaving, setIsSaving] = useState(false)

  // AutoSave function
  // Note: Using this function can increase API calls to OpenAI
  useAutosave({
    data: text,
    onSave: async (_value) => {
      setIsSaving(true)
      updateEntry(entry.id, _value)
      setIsSaving(false)
    },
  })

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setText(e.target.value)

  return (
    <div>
      <div className="w-full h-full">
        {isSaving && <div>Loading...</div>}
        <textarea
          className="w-full h-full p-8 text-xl outline-none"
          value={text}
          onChange={handleOnChange}
        />
      </div>
    </div>
  )
}

export default Editor
