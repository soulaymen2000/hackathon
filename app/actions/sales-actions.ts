"use server"

import { revalidatePath } from "next/cache"
import { getAllSalesOrders, getSalesOrderById, createSalesOrder, createSalesOrderItem } from "@/lib/models/sales"

export async function fetchAllSalesOrders() {
  try {
    const orders = await getAllSalesOrders()
    return { success: true, data: orders }
  } catch (error) {
    console.error("Error fetching sales orders:", error)
    return { success: false, error: "Failed to fetch sales orders" }
  }
}

export async function fetchSalesOrderDetails(id: number) {
  try {
    const order = await getSalesOrderById(id)
    return { success: true, data: order }
  } catch (error) {
    console.error("Error fetching sales order details:", error)
    return { success: false, error: "Failed to fetch sales order details" }
  }
}

export async function createNewSalesOrder(orderData: any) {
  try {
    const orderId = await createSalesOrder(orderData)
    revalidatePath("/sales")
    return { success: true, data: { id: orderId } }
  } catch (error) {
    console.error("Error creating sales order:", error)
    return { success: false, error: "Failed to create sales order" }
  }
}
