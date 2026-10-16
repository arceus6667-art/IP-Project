import {pool} from '../../../lib/db';
import {currentUserId} from '../../../lib/auth';
import {result,safeError} from '../../../lib/utils';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(){try{const id=await currentUserId();if(!id)return result({error:'Not signed in.'},401);const {rows}=await pool.query('SELECT id,type,counterparty_email,amount_paise,note,created_at FROM wallet_transactions WHERE user_id=$1 ORDER BY created_at DESC,id DESC LIMIT 100',[id]);return result({transactions:rows.map(r=>({...r,amount_paise:Number(r.amount_paise)}))})}catch(e){return safeError(e)}}
