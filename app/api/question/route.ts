import { getUserByAuthId } from "@/utils/auth"
import { prismaDB } from "@/utils/db"
import {qa} from '@/utils/ai'
import { NextResponse } from "next/server"

export const POST = async (req) => {
const {question} = await req.json()
const user = await getUserByAuthId()

const entries = await prismaDB.journalEntry.findMany({
    where: {
        userId: user.id
    },
    select: {
        id: true,
        content: true,
        createdAt: true
    }
})

const answer = await qa(question, entries)

return NextResponse.json({data: answer})
}