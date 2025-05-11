import { executeQuery } from "../db"

export interface SalesOrder {
  id: number
  customerId: number
  date: string
  status: string
  total: number
}

export interface SalesOrderItem {
  id: number
  orderId: number
  productId: number
  quantity: number
  price: number
  total: number
}

export async function getAllSalesOrders(): Promise<SalesOrder[]> {
  return executeQuery<SalesOrder>("SELECT * FROM SalesOrders ORDER BY date DESC")
}

export async function getSalesOrderById(id: number): Promise<SalesOrder | null> {
  const orders = await executeQuery<SalesOrder>(
    "SELECT * FROM SalesOrders WHERE id = @id",
    { id }
  )
  return orders[0] || null
}

export async function getSalesOrderItems(orderId: number): Promise<SalesOrderItem[]> {
  return executeQuery<SalesOrderItem>(
    "SELECT * FROM SalesOrderItems WHERE orderId = @orderId",
    { orderId }
  )
}

export async function createSalesOrder(order: Omit<SalesOrder, "id">): Promise<number> {
  const result = await executeQuery<{ id: number }>(
    `INSERT INTO SalesOrders (customerId, date, status, total)
     VALUES (@customerId, @date, @status, @total);
     SELECT SCOPE_IDENTITY() as id;`,
    order
  )
  return result[0].id
}

export async function createSalesOrderItem(item: Omit<SalesOrderItem, "id">): Promise<number> {
  const result = await executeQuery<{ id: number }>(
    `INSERT INTO SalesOrderItems (orderId, productId, quantity, price, total)
     VALUES (@orderId, @productId, @quantity, @price, @total);
     SELECT SCOPE_IDENTITY() as id;`,
    item
  )
  return result[0].id
}

export async function updateSalesOrderStatus(id: number, status: string): Promise<void> {
  await executeQuery(
    "UPDATE SalesOrders SET status = @status, updatedAt = GETDATE() WHERE id = @id",
    { id, status }
  )
}
