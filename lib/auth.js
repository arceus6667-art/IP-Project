import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
const key=()=>{if(!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length<32) throw Error('Set SESSION_SECRET (at least 32 characters)');return new TextEncoder().encode(process.env.SESSION_SECRET)};
export function makePassword(password){const salt=randomBytes(16).toString('hex');return {salt,hash:scryptSync(password,salt,64).toString('hex')}}
export function verifyPassword(password,salt,hash){const actual=scryptSync(password,salt,64);const expected=Buffer.from(hash,'hex');return actual.length===expected.length && timingSafeEqual(actual,expected)}
export async function signSession(id){return new SignJWT({sub:id}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(key())}
export async function currentUserId(){try{const token=(await cookies()).get('wallet_session')?.value;if(!token)return null;const {payload}=await jwtVerify(token,key());return payload.sub || null}catch{return null}}
export function withCookie(response,token){response.cookies.set('wallet_session',token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:7*86400});return response}
