import { Context } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts"
import key from './key.ts'

export const myAuth=async (ctx:Context,next:any)=>{
  
  let decodedToken:any;
  const authHeader:string=ctx.request.headers.get('Authorization');

  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = {message: 'No req headers'};
  }

  const token:any=authHeader.split(' ')[1];
   if (!token) {
    ctx.response.status = 401;
    return;
  }
  
  const decoded=await validateJwt(token, key, {isThrowing: false});

  if (decoded){
    ctx.request.user=decoded.user;
    await next();
    return;
  }
  
  ctx.response.status = 401;
  ctx.response.body = {message: 'Invalid jwt token'};
  }

