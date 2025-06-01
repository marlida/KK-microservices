import { Prisma } from '@prisma/client'

export type User = Prisma.UserGetPayload<{}>
export type UserCreateInput = Prisma.UserCreateInput
export type UserUpdateInput = Prisma.UserUpdateInput