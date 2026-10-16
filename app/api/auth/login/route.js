import { pool } from '../../../../lib/db';
import { verifyPassword,signSession,withCookie } from '../../../../lib/auth';
import { result,safeError } from '../../../../lib/utils';
export const runtime='nodejs';
export async function POST(request){try{const {email,password}=await request.json();if(typeof email!=='string'||typeof password!=='string')return result({error:'Invalid credentials.'},401);const {rows}=await pool.query('SELECT id,password_hash,password_salt FROM wallet_users WHERE email=$1',[email.trim().toLowerCase()]);if(!rows[0]||!verifyPassword(password,rows[0].password_salt,rows[0].password_hash))return result({error:'Invalid credentials.'},401);return withCookie(result({ok:true}),await signSession(rows[0].id))}catch(err){return safeError(err)}}
