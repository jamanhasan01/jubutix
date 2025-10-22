// components/UserDataTable.jsx or app/dashboard/users/page.jsx
"use client"; // Required for client-side interactions like dropdowns and click handlers

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserType } from '@/types/user.types'; // Assuming UserType is here

// Define the correct props interface for the component
interface UserDataTableProps {
  users: UserType[]; // The component expects an array of UserType
}

// Dummy handlers to prevent immediate runtime errors on click (replace with actual logic)
const handleChangeRole = (id: string, currentRole: string | null | undefined) => {
  console.log(`Changing role for user ${id}. Current role: ${currentRole}`);
  // Implement actual role change logic here (e.g., API call)
};

const handleDelete = (id: string, name: string) => {
  console.log(`Deleting user ${name} (${id})`);
  // Implement actual delete logic here (e.g., API call)
};

// ------------------------------------

// Fix: Use the correct UserDataTableProps interface
const UserDataTable = ({ users: recentUsers }: UserDataTableProps) => {
  return (
    <div className="p-6 w-full">
      <div>
        <Card className="">
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
                  <TableHead className="w-[60px]">Pic</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Updated</TableHead>
                  <TableHead className="w-[60px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentUsers.length > 0 ? (
                  recentUsers.map((user) => (
                    // Fix: user._id is now guaranteed to exist by the updated UserType
                    <TableRow key={user._id}>
                      {/* Profile Picture Cell */}
                      <TableCell>
                        <div className="relative h-8 w-8 overflow-hidden rounded-full">
                          {user.profileImage ? (
                            <Image
                              src={user.profileImage}
                              alt={`${user.name}'s picture`}
                              fill
                              style={{ objectFit: 'cover' }}
                              sizes="32px"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 text-xs font-semibold">
                              {user.name ? user.name[0].toUpperCase() : 'U'}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.email}
                      </TableCell>

                      {/* Role Badge Cell */}
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`uppercase ${
                            user.role === 'admin'
                              ? 'bg-red-500/10 text-red-600'
                              : 'bg-blue-500/10 text-blue-600'
                          }`}
                        >
                          {user.role}
                        </Badge>
                      </TableCell>

                      {/* UpdatedAt Cell */}
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {user.updatedAt
                          ? new Date(user.updatedAt).toLocaleDateString()
                          : 'N/A'}
                      </TableCell>

                      {/* ACTION COLUMN CELL */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open actions menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>User Actions</DropdownMenuLabel>

                            {/* Change Role Action */}
                            <DropdownMenuItem
                              onClick={() => handleChangeRole(user._id, user.role)}
                              // Dynamic text and color based on current role
                              className={
                                user.role === 'admin'
                                  ? 'text-blue-600 focus:bg-blue-50'
                                  : 'text-red-600 focus:bg-red-50'
                              }
                            >
                              {user.role === 'admin'
                                ? 'Demote to User'
                                : 'Promote to Admin'}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {/* Delete Action (Permanently dangerous) */}
                            <DropdownMenuItem
                              className="text-red-600 focus:bg-red-100/50"
                              onClick={() => handleDelete(user._id, user.name)}
                            >
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
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
  );
};

export default UserDataTable;