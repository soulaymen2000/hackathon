"use server"

import { revalidatePath } from "next/cache"
import { getAllPurchaseOrders, getPurchaseOrderById, createPurchaseOrder, createPurchaseOrderItem } from "@/lib/models/purchase"

export async function fetchAllPurchaseOrders() {
  try {
    const orders = await getAllPurchaseOrders()
    return { success: true, data: orders }
  } catch (error) {
    console.error("Error fetching purchase orders:", error)
    return { success: false, error: "Failed to fetch purchase orders" }
  }
}

export async function fetchPurchaseOrderDetails(id: number) {
  try {
    const order = await getPurchaseOrderById(id)
    return { success: true, data: order }
  } catch (error) {
    console.error("Error fetching purchase order details:", error)
    return { success: false, error: "Failed to fetch purchase order details" }
  }
}

export async function createNewPurchaseOrder(orderData: any) {
  try {
    const orderId = await createPurchaseOrder(orderData)
    revalidatePath("/purchase")
    return { success: true, data: { id: orderId } }
  } catch (error) {
    console.error("Error creating purchase order:", error)
    return { success: false, error: "Failed to create purchase order" }
  }
}
