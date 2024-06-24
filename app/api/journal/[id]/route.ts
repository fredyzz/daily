import { prismaDB } from '@/utils/db';
import { getUserByAuthId } from '@/utils/auth';
import { NextResponse } from 'next/server';

interface ParamsInterface {
    params: {id: string}
}

export const PATCH = async (request: Request, {params} : ParamsInterface) => {
    const {content} = await request.json()

    const user = await getUserByAuthId()

    const updatedEntry = await prismaDB.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: params.id
            }
        },
        data: {
            content
        }
    })

    return NextResponse.json({data: updatedEntry})


}