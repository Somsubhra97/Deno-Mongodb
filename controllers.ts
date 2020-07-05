import { Context } from "https://deno.land/x/oak/mod.ts";
import { makeJwt, setExpiration, Jose, Payload } from "https://deno.land/x/djwt/create.ts"
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

import { User } from "./users_mongo";
import {getDb} from "./Userdb.ts";
import key from './key.ts';

const Userdb = getDb().collection("test");
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
}

export const register=async(ctx:Context)=>{
  const {value:{name,password}}=await ctx.request.body();

  const existingUser=await Userdb.findOne({name});
  if(existingUser){
    ctx.response.status = 500;
    ctx.response.body = {message: 'User exists'}   
  }

  let hashed=await bcrypt.hash(password);
  await Userdb.insertOne({
    name,password:hashed
  })
  ctx.response.status=201;
  ctx.response.body={
    msg:'success'
  }
  
}

export const login = async (ctx: Context) => {
  const {value:{name,password}} = await ctx.request.body();
  let payload:Payload;
  let user:User;
  let jwt:any;

  user=await Userdb.findOne({name,password});
  payload={
    iss: user,
    exp: setExpiration(new Date().getTime() + 3600),
     } 
  
 
  try{
      jwt = makeJwt({key, header, payload});
    }
  catch(e){
    ctx.response.status = 500;
    ctx.response.body = {message: 'Internal error'};   
        }  
    
    ctx.response.status = 200;
    ctx.response.body = {
        jwt
      }
    }

export const auth = (ctx: Context) => {
  ctx.response.body = 'Auth success';
}