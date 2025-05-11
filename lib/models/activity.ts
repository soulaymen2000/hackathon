import { executeQuery } from "../db"

export interface ActivityLogEntry {
  id: number
  userId: number | null
  action: string
  ipAddress: string | null
  timestamp: string
}

export async function logActivity(entry: Omit<ActivityLogEntry, "id" | "timestamp">): Promise<void> {
  await executeQuery(
    `INSERT INTO ActivityLog (userId, action, ipAddress)
     VALUES (@userId, @action, @ipAddress)`,
    entry
  )
}

export async function getRecentActivity(limit = 10): Promise<ActivityLogEntry[]> {
  return executeQuery<ActivityLogEntry>(
    `SELECT al.*, u.name as userName
     FROM ActivityLog al
     LEFT JOIN Users u ON al.userId = u.id
     ORDER BY timestamp DESC
     OFFSET 0 ROWS FETCH NEXT @limit ROWS ONLY`,
    { limit }
  )
}

export async function getUserActivity(userId: number, limit = 10): Promise<ActivityLogEntry[]> {
  return executeQuery<ActivityLogEntry>(
    `SELECT *
     FROM ActivityLog
     WHERE userId = @userId
     ORDER BY timestamp DESC
     OFFSET 0 ROWS FETCH NEXT @limit ROWS ONLY`,
    { userId, limit }
  )
}
