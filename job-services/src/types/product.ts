import { Prisma } from '@prisma/client'

export type Product = Prisma.ProductGetPayload<{}>
export type ProductCreateInput = Prisma.ProductCreateInput
export type ProductUpdateInput = Prisma.ProductUpdateInput