import { getAllUsers } from '@/lib/action/user.action'
import UserDataTable from './components/UserDataTable'

const page = async () => {
  const { users } = await getAllUsers()

  return (
    <div>
      <UserDataTable users={users} />
    </div>
  )
}

export default page
