import { prismaDB } from '@/utils/db'
import { getUserByAuthId } from '@/utils/auth'
import { NextResponse } from 'next/server'
import { analyze } from '@/utils/ai'

interface ParamsInterface {
  params: { id: string }
}

export const PATCH = async (request: Request, { params }: ParamsInterface) => {
  const { content } = await request.json()

  const user = await getUserByAuthId()

  const updatedEntry = await prismaDB.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  })


  const analysis = await analyze(updatedEntry.content)

  // Upsert is used topdate if analysis exists, or create it.
  const updatedAnalysis = await prismaDB.analysis.upsert({
    where: {
        entryId: updatedEntry.id
    },
    create: {
        userId: user.id,
        entryId: updatedEntry.id,
        ...analysis!
    },
    update: analysis!
  })

  return NextResponse.json({ data: {...updatedEntry, analysis: updatedAnalysis} })
}
