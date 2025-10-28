// components/UserDataTable.jsx or app/dashboard/users/page.jsx
'use client' // Required for client-side interactions like dropdowns and click handlers

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserType } from '@/types/user.types' // Assuming UserType is here
import { OptionsSectionDialog } from '../../components/OptionsChnageDialog'
import { editUserRole } from '@/lib/action/user.action'
import { toast } from 'sonner'

interface UserDataTableProps {
  users: UserType[]
}

const userRoleOfArr = ['admin', 'moderator', 'user']

const UserDataTable = ({ users: recentUsers }: UserDataTableProps) => {
  const getValueOfUser = async (role: string, userId: string) => {
    const res = await editUserRole(role, userId)
   if (res.success==true) {
    return toast.success(`${res.message}`)
   }
   return toast.error(`${res.message}`)
  }

  return (
    <div className='p-6 w-full'>
      <div>
        <Card className=''>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>
              Latest {recentUsers.length} users registered or updated
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[60px]'>Picture</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className='text-center'>Updated</TableHead>
                  <TableHead className='w-[60px] text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.length > 0 ? (
                  recentUsers.map((user) => (
                    <TableRow key={user._id}>
                      {/* Profile Picture Cell */}
                      <TableCell>
                        <div className='relative h-8 w-8 overflow-hidden rounded-full'>
                          {user.profileImage ? (
                            <Image
                              src={user.profileImage}
                              alt={`${user.name}'s picture`}
                              fill
                              style={{ objectFit: 'cover' }}
                              sizes='32px'
                            />
                          ) : (
                            <div className='flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 text-xs font-semibold'>
                              {user.name ? user.name[0].toUpperCase() : 'U'}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className='font-medium capitalize'>{user.name}</TableCell>
                      <TableCell className='text-sm text-muted-foreground'>{user.email}</TableCell>

                      {/* Role Badge Cell */}
                      <TableCell>
                        <Badge
                          variant='outline'
                          className={`capitalize ${
                            user.role === 'admin'
                              ? 'bg-red-500/10 text-red-600'
                              : 'bg-blue-500/10 text-blue-600'
                          }`}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>

                      {/* UpdatedAt Cell */}
                      <TableCell className='text-center text-xs text-muted-foreground'>
                        {user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : 'N/A'}
                      </TableCell>

                      {/* ACTION COLUMN CELL */}
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                              <span className='sr-only'>Open actions menu</span>
                              <MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                            <OptionsSectionDialog
                              items={userRoleOfArr}
                              level={'select role'}
                              getValue={(role) => getValueOfUser(role, user._id)}
                              title='Change User Role'
                              desc={` Select a new role from the list below to update the user's access permissions within the system.`}
                            ></OptionsSectionDialog>

                            <DropdownMenuSeparator />

                            {/* Delete Action (Permanently dangerous) */}
                            <DropdownMenuItem className='text-red-600 focus:bg-red-100/50'>
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className='h-24 text-center'>
                      No recent users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserDataTable
