import { neon } from '@neondatabase/serverless'

const connectionString = process.env.NEON_DATABASE_URL
if (!connectionString) {
  throw new Error('NEON_DATABASE_URL environment variable is not set')
}

// The neon function returns a tagged template function for queries
const sql = neon(connectionString)

export default sql 