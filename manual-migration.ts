import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL!);

async function main() {
  try {
    console.log("Starting manual migration...");

    // 1. Create enum for user_role
    await sql`DO $$ BEGIN
      CREATE TYPE user_role AS ENUM ('customer', 'seller', 'admin');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;`;
    console.log("Created user_role enum");

    // 2. Add role column to users table
    await sql`ALTER TABLE users ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'customer';`;
    console.log("Added role column to users");

    // 3. Add seller_id column to products table
    await sql`ALTER TABLE products ADD COLUMN IF NOT EXISTS seller_id UUID REFERENCES users(id);`;
    console.log("Added seller_id to products");

    console.log("Migration successful!");
  } catch (err) {
    console.error("Migration failed:", err);
  } finally {
    await sql.end();
  }
}

main();
