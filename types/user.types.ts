  export type UserType= {
    id: string
    _id: string
    name: string
    email: string
    emailVerified?: Date | null
    profileImage?: string | null
    role?: string | null
    updatedAt?: Date | string
  }