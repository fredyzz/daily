import { analyze } from '@/utils/ai'
import { getUserByAuthId } from '@/utils/auth'
import { prismaDB } from '@/utils/db'
import { NextResponse } from 'next/server'


export const POST = async () => {
  const user = await getUserByAuthId()

  const entry = await prismaDB.journalEntry.create({
    data: {
      content: `${Date.now().toString()} - this was a very happy day`,
      userId: user.id,
    },
  })

  const analysis = await analyze(entry.content) 

  await prismaDB.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis!
    },
  })

  return NextResponse.json({ data: entry })
}
