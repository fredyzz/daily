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
  const analysisDate = [
    { name: 'Summary', value: '' },
    { name: 'Subject', value: '' },
    { name: 'Mood', value: '' },
    { name: 'Negative', value: false },
  ]

  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">{entry && <Editor entry={entry} />}</div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
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

export default EntryPage
