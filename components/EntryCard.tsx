interface EntryCardProps {
  entry: {
    id: string
  }
}

function EntryCard({ entry }: EntryCardProps) {
  return <div>{entry.id}</div>
}

export default EntryCard
