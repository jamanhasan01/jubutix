import { getAllUsers } from '@/lib/action/user.action'
import UserDataTable from './components/UserDataTable'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const page = async () => {
  const { users } = await getAllUsers()
  const session = await auth()

  if (session?.user.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div>
      <UserDataTable users={users} />
    </div>
  )
}

export default page
