import { executeQuery } from "../db"

export interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  lastActive: string
}

export async function getAllUsers(): Promise<User[]> {
  return executeQuery<User>("SELECT id, name, email, role, status, lastActive FROM Users")
}

export async function getUserById(id: number): Promise<User | null> {
  const users = await executeQuery<User>(
    "SELECT id, name, email, role, status, lastActive FROM Users WHERE id = @id",
    { id }
  )
  return users[0] || null
}

export async function createUser(user: Omit<User, "id">): Promise<number> {
  const result = await executeQuery<{ id: number }>(
    `INSERT INTO Users (name, email, password, role, status)
     VALUES (@name, @email, @password, @role, @status);
     SELECT SCOPE_IDENTITY() as id;`,
    user
  )
  return result[0].id
}

export async function updateUserStatus(id: number, status: string): Promise<void> {
  await executeQuery(
    "UPDATE Users SET status = @status, updatedAt = GETDATE() WHERE id = @id",
    { id, status }
  )
}

export async function updateUserLastActive(id: number): Promise<void> {
  await executeQuery(
    "UPDATE Users SET lastActive = GETDATE(), updatedAt = GETDATE() WHERE id = @id",
    { id }
  )
}
