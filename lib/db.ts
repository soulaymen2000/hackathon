import sql from "mssql"
import type { IResult } from "mssql"

// SQL Server configuration
const sqlConfig = {
  user: process.env.SQL_USER || "sa",
  password: process.env.SQL_PASSWORD || "azer",
  database: process.env.SQL_DATABASE || "stock_chain_db",
  server: process.env.SQL_SERVER || "DESKTOP-4AEM28G",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false, // for local development
    trustServerCertificate: true,
    enableArithAbort: true,
  },
}

// Create a connection pool
let pool: sql.ConnectionPool | null = null

export async function getConnection(): Promise<sql.ConnectionPool> {
  try {
    if (pool) return pool
    pool = await new sql.ConnectionPool(sqlConfig).connect()
    console.log("Connected to SQL Server")
    return pool
  } catch (err) {
    console.error("SQL Server connection error:", err)
    throw err
  }
}

// Execute a query with proper error handling
export async function executeQuery<T>(query: string, params: Record<string, any> = {}): Promise<T[]> {
  try {
    const pool = await getConnection()
    const request = pool.request()

    // Add parameters to the request with proper type inference
    Object.entries(params).forEach(([key, value]) => {
      if (value instanceof Date) {
        request.input(key, sql.DateTime, value)
      } else if (typeof value === 'number') {
        if (Number.isInteger(value)) {
          request.input(key, sql.Int, value)
        } else {
          request.input(key, sql.Decimal(10, 2), value)
        }
      } else if (typeof value === 'boolean') {
        request.input(key, sql.Bit, value)
      } else {
        request.input(key, value)
      }
    })

    // Execute the query
    const result = await request.query(query)
    return result.recordset as T[]
  } catch (err) {
    console.error("SQL query error:", err)
    throw err
  }
}
