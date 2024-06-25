export interface EntryInterface {
    content: string
    createdAt: Date
    id: string
    updatedAt: Date
    userId: string,
    analysis?: {
        id: string,
        createdAt: Date,
        updatedAt: Date,
        entryId: string,
        mood: string,
        subject: string,
        summary: string,
        color: string,
        negative: boolean,
        sentimentScore: number
      } | null;
}