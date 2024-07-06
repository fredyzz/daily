import HistoryChart from '@/components/HistoryChart'
import { getUserByAuthId } from '@/utils/auth'
import { prismaDB } from '@/utils/db'

const getData = async () => {
  const user = await getUserByAuthId()

  const analysis = await prismaDB.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const sum = analysis.reduce((all, current) => all + current.sentimentScore, 0)
  const avg = Math.round(sum / analysis.length)

  return { analysis, avg }
}

const HistoryPage = async () => {
  const { analysis, avg } = await getData()

  return (
    <div className="w-full h-full">
      <div>{`Avg. sentiment score: ${avg}`}</div>
      <div className="w-full h-full">
        <HistoryChart data={analysis} />
      </div>
    </div>
  )
}

export default HistoryPage
