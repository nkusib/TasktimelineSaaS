import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { db } from './db'
import type { User } from './db'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'remitflow-secret-change-in-production-min-32-chars'
)

export const COOKIE_NAME = 'rf_session'

export async function createToken(userId: string): Promise<string> {
  return new SignJWT({ sub: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload.sub as string
  } catch {
    return null
  }
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    if (!token) return null

    const userId = await verifyToken(token)
    if (!userId) return null

    const user = db.prepare(
      'SELECT * FROM users WHERE id = ? AND is_active = 1'
    ).get(userId) as User | undefined

    return user ?? null
  } catch {
    return null
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getSession()
  if (!user) throw new Error('Unauthorized')
  return user
}

export async function requireAdmin(): Promise<User> {
  const user = await requireAuth()
  if (!['admin', 'super_admin'].includes(user.role)) throw new Error('Forbidden')
  return user
}

export function setSessionCookie(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  }
}

export function clearSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: '',
    maxAge: 0,
    path: '/',
  }
}
