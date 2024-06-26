import Editor from '@/components/Editor'
import { getUserByAuthId } from '@/utils/auth'
import { prismaDB } from '@/utils/db'

const getEntry = async (entryId: string) => {
  const user = await getUserByAuthId()

  const entry = await prismaDB.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: entryId,
      },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

interface EntryPageProps {
  params: {
    id: string
  }
}

const EntryPage = async ({ params }: EntryPageProps) => {
  const entry = await getEntry(params.id)

  return (
    <div className="h-full w-full">{entry && <Editor entry={entry} />}</div>
  )
}

export default EntryPage
