import { Prisma } from '@prisma/client'

export type Order = Prisma.OrderGetPayload<{}>
export type OrderCreateInput = Prisma.OrderCreateInput
export type OrderUpdateInput = Prisma.OrderUpdateInput