import { executeQuery } from "../db"

export interface Product {
  id: number
  name: string
  sku: string
  category: string
  stock: number
  threshold: number
  expiryDate: string
  image: string
  price: number
  cost: number
}

export async function getAllProducts(): Promise<Product[]> {
  return executeQuery<Product>("SELECT * FROM Products")
}

export async function getProductById(id: number): Promise<Product | null> {
  const products = await executeQuery<Product>("SELECT * FROM Products WHERE id = @id", { id })
  return products[0] || null
}

export async function getLowStockProducts(): Promise<Product[]> {
  return executeQuery<Product>("SELECT * FROM Products WHERE stock <= threshold")
}

export async function getExpiringProducts(days = 7): Promise<Product[]> {
  return executeQuery<Product>("SELECT * FROM Products WHERE DATEDIFF(day, GETDATE(), expiryDate) <= @days", { days })
}

export async function updateProductStock(id: number, stock: number): Promise<void> {
  await executeQuery("UPDATE Products SET stock = @stock WHERE id = @id", { id, stock })
}
