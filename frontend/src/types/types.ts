export interface Order {
  id: number
  name: string
  status: string
  customer_issue: string
  technician_issue: string
  deposit: number
  total: number
  createdAt: string
  updatedAt: string
  admin?: { name: string }
  product?: { name: string, serial: string }
}

export interface User {
  id: number
  name: string
  tel: string
  createdAt: string
}

export interface Admin {
  id: number
  name: string
  tel: string
  createdAt: string
  updatedAt: string
}

export interface Brand {
  id: number
  name: string
  createdAt: string
}

export interface Category {
  id: number
  name: string
  brand?: { name: string }
  createdAt: string
}

export interface Product {
  id: number
  name: string
  price: number
  serial: string
  quantity: number
  sold: number
  brand?: { name: string }
  category?: { name: string }
  createdAt: string
}