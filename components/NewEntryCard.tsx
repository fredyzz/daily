'use client'

import { createNewEntry } from '@/services/api'
import { useRouter } from 'next/navigation'

function NewEntryCard() {
  const router = useRouter()

  const handleOnClick = async () => {
    const newEntry = await createNewEntry()
    router.push(`/journal/${newEntry.id}`)
  }

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <span className="text-3xl">New Entry</span>
      </div>
    </div>
  )
}

export default NewEntryCard
