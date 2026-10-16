import {pool} from '../../../lib/db';
import {currentUserId} from '../../../lib/auth';
import {result,safeError} from '../../../lib/utils';
export const runtime='nodejs';
export async function GET(){try{const id=await currentUserId();if(!id)return result({error:'Not signed in.'},401);const {rows}=await pool.query('SELECT type,counterparty_email,amount_paise,note,created_at FROM wallet_transactions WHERE user_id=$1 ORDER BY created_at DESC LIMIT 10000',[id]);const q=(v)=>'"'+String(v??'').replace(/^[=+@\-\t\r]/,'\'$&').replace(/"/g,'""')+'"';const csv=['Date,Type,Counterparty,Amount INR,Note',...rows.map(r=>[new Date(r.created_at).toISOString(),r.type,r.counterparty_email,(Number(r.amount_paise)/100).toFixed(2),r.note].map(q).join(','))].join('\r\n');return new Response(csv,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="wallet-statement.csv"','Cache-Control':'no-store'}})}catch(e){return safeError(e)}}
