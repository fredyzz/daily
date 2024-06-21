'use client'

import { EntryInterface } from '@/interfaces/entry'

interface EditorProps {
  entry: EntryInterface
}

const Editor = ({ entry }: EditorProps) => {
  return <div>{entry.content}</div>
}

export default Editor
