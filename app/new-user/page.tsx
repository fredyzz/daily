import { prismaDB } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const authUser = await currentUser()

  const authUserId = authUser?.id
  const authUserEmail = authUser?.emailAddresses?.[0]?.emailAddress

  if (authUserId && authUserEmail) {
    const match = await prismaDB.user.findUnique({
      where: {
        authId: authUserId as string,
      },
    })

    if (!match) {
      await prismaDB.user.create({
        data: {
          authId: authUserId,
          email: authUserEmail,
        },
      })
    }

    redirect('/journal')
  }
}

const NewUserPage = async () => {
  await createNewUser()

  return <div>Loading...</div>
}

export default NewUserPage
