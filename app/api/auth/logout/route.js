import { result } from '../../../../lib/utils';
export async function POST(){const response=result({ok:true});response.cookies.set('wallet_session','',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:0});return response}
