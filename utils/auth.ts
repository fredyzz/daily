import { auth } from "@clerk/nextjs/server"
import { prismaDB } from "./db"

type ParamsTypes = { select?: any, include?: never } | { include?: any, select?: never }

export const getUserByAuthId = async (params: ParamsTypes = {})=> {
 const {userId} = auth()

 const user  = await prismaDB.user.findUniqueOrThrow({
    where: {
        authId: userId as string
    },
    ...params
 })

 return user
}