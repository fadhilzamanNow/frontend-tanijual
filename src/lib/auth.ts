import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'


const DEFAULT_EXP = process.env.JWT_EXPIRES_IN || '7d'

export type AuthTokenPayload = {
  sub: string
  role: 'user' | 'seller'
  [key: string]: unknown
}


function getSecret() {
const secret = process.env.JWT_SECRET
if (!secret) throw new Error('Missing JWT_SECRET')
return new TextEncoder().encode(secret)
}


export async function hashPassword(password: string) {
const salt = await bcrypt.genSalt(10)
return bcrypt.hash(password, salt)
}


export async function verifyPassword(password: string, hash: string) {
return bcrypt.compare(password, hash)
}


export async function signToken(payload: object, expiresIn = DEFAULT_EXP) {
return new SignJWT({ ...payload })
.setProtectedHeader({ alg: 'HS256' })
.setIssuedAt()
.setExpirationTime(expiresIn)
.sign(getSecret())
}


export async function verifyToken<T = any>(token: string) {
const { payload } = await jwtVerify(token, getSecret())
return payload as T
}
