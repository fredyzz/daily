import { getUserByAuthId } from "@/utils/auth"
import { prismaDB } from "@/utils/db"
import { NextResponse } from "next/server"


export const POST = async () => {
    const user = await getUserByAuthId()

    const entry = await prismaDB.journalEntry.create({
        data: {
            content: `${Date.now().toString()} - new journal entry`,
            userId: user.id
        }
    })

    return NextResponse.json({data: entry})
}