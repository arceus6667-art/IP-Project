import { randomUUID } from 'node:crypto';
import { pool } from '../../../../lib/db';
import { makePassword,signSession,withCookie } from '../../../../lib/auth';
import { result,safeError } from '../../../../lib/utils';
export const runtime='nodejs';
export async function POST(request){try{const {name,email,password}=await request.json();const n=String(name||'').trim(),e=String(email||'').trim().toLowerCase();if(n.length<2||n.length>80||!/^\S+@\S+\.\S+$/.test(e)||e.length>200||typeof password!=='string'||password.length<8||password.length>128)return result({error:'Enter a name, valid email and password of 8–128 characters.'},400);const {hash,salt}=makePassword(password),id=randomUUID();await pool.query('INSERT INTO wallet_users(id,name,email,password_hash,password_salt) VALUES($1,$2,$3,$4,$5)',[id,n,e,hash,salt]);return withCookie(result({ok:true}),await signSession(id))}catch(err){if(err.code==='23505')return result({error:'Email already registered.'},409);return safeError(err)}}
