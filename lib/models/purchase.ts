import { executeQuery } from "../db"

export interface PurchaseOrder {
  id: number
  supplier: string
  date: string
  status: string
  total: number
}

export interface PurchaseOrderItem {
  id: number
  orderId: number
  productId: number
  quantity: number
  cost: number
  total: number
}

export async function getAllPurchaseOrders(): Promise<PurchaseOrder[]> {
  return executeQuery<PurchaseOrder>("SELECT * FROM PurchaseOrders ORDER BY date DESC")
}

export async function getPurchaseOrderById(id: number): Promise<PurchaseOrder | null> {
  const orders = await executeQuery<PurchaseOrder>(
    "SELECT * FROM PurchaseOrders WHERE id = @id",
    { id }
  )
  return orders[0] || null
}

export async function getPurchaseOrderItems(orderId: number): Promise<PurchaseOrderItem[]> {
  return executeQuery<PurchaseOrderItem>(
    "SELECT * FROM PurchaseOrderItems WHERE orderId = @orderId",
    { orderId }
  )
}

export async function createPurchaseOrder(order: Omit<PurchaseOrder, "id">): Promise<number> {
  const result = await executeQuery<{ id: number }>(
    `INSERT INTO PurchaseOrders (supplier, date, status, total)
     VALUES (@supplier, @date, @status, @total);
     SELECT SCOPE_IDENTITY() as id;`,
    order
  )
  return result[0].id
}

export async function createPurchaseOrderItem(item: Omit<PurchaseOrderItem, "id">): Promise<number> {
  const result = await executeQuery<{ id: number }>(
    `INSERT INTO PurchaseOrderItems (orderId, productId, quantity, cost, total)
     VALUES (@orderId, @productId, @quantity, @cost, @total);
     SELECT SCOPE_IDENTITY() as id;`,
    item
  )
  return result[0].id
}

export async function updatePurchaseOrderStatus(id: number, status: string): Promise<void> {
  await executeQuery(
    "UPDATE PurchaseOrders SET status = @status, updatedAt = GETDATE() WHERE id = @id",
    { id, status }
  )
}
