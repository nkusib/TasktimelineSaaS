#!/usr/bin/env node
/**
 * Seed script: creates an admin user for RemitFlow
 * Usage: node scripts/seed-admin.js
 */
const bcrypt = require('bcryptjs')
const path = require('path')
const fs = require('fs')

const DB_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DB_DIR, 'remitflow.db')

if (!fs.existsSync(DB_DIR)) {
  console.log('Database not found. Start the app first to initialize the DB.')
  process.exit(1)
}

const Database = require('better-sqlite3')
const db = new Database(DB_PATH)

const { nanoid } = require('nanoid')

const adminEmail = process.env.ADMIN_EMAIL || 'admin@remitflow.app'
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@RemitFlow2025!'
const adminName = process.env.ADMIN_NAME || 'RemitFlow Admin'

const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(adminEmail)
if (existing) {
  console.log(`Admin user already exists: ${adminEmail}`)
  process.exit(0)
}

const hash = bcrypt.hashSync(adminPassword, 10)
const id = nanoid()

db.prepare(
  'INSERT INTO users (id, email, name, password_hash, role, kyc_status, kyc_level, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
).run(id, adminEmail, adminName, hash, 'super_admin', 'verified', 3, 'GB')

console.log('✅ Admin user created:')
console.log(`   Email:    ${adminEmail}`)
console.log(`   Password: ${adminPassword}`)
console.log(`   Role:     super_admin`)
console.log('')
console.log('⚠️  Change this password immediately in production!')
