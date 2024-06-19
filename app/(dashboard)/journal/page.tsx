import { getUserByAuthId } from '@/utils/auth'
import { prismaDB } from '@/utils/db'

const getEntries = async () => {
  const user = await getUserByAuthId()
  const entries = await prismaDB.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()
  console.log({ entries })

  return <div>journalpage</div>
}

export default JournalPage
