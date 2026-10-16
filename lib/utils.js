import { NextResponse } from 'next/server';
export const result=(data,status=200)=>NextResponse.json(data,{status});
export function toPaise(value){if(typeof value !== 'string' && typeof value !== 'number')return null;const s=String(value).trim();if(!/^(?:0|[1-9]\d{0,7})(?:\.\d{1,2})?$/.test(s))return null;const [major,minor='']=s.split('.');const n=Number(major)*100+Number(minor.padEnd(2,'0'));return Number.isSafeInteger(n)&&n>0?n:null}
export const safeError=(error)=>{console.error(error);return result({error:'Server error. Please try again.'},500)};
