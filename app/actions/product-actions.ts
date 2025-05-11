"use server"

import { revalidatePath } from "next/cache"
import { getAllProducts, getLowStockProducts, getExpiringProducts, updateProductStock } from "@/lib/models/product"

export async function fetchAllProducts() {
  try {
    const products = await getAllProducts()
    return { success: true, data: products }
  } catch (error) {
    console.error("Error fetching products:", error)
    return { success: false, error: "Failed to fetch products" }
  }
}

export async function fetchLowStockProducts() {
  try {
    const products = await getLowStockProducts()
    return { success: true, data: products }
  } catch (error) {
    console.error("Error fetching low stock products:", error)
    return { success: false, error: "Failed to fetch low stock products" }
  }
}

export async function fetchExpiringProducts(days = 7) {
  try {
    const products = await getExpiringProducts(days)
    return { success: true, data: products }
  } catch (error) {
    console.error("Error fetching expiring products:", error)
    return { success: false, error: "Failed to fetch expiring products" }
  }
}

export async function updateInventory(id: number, stock: number) {
  try {
    await updateProductStock(id, stock)
    revalidatePath("/stock")
    return { success: true }
  } catch (error) {
    console.error("Error updating inventory:", error)
    return { success: false, error: "Failed to update inventory" }
  }
}
