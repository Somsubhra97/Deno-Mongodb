import { Router } from "https://deno.land/x/oak/mod.ts";
import {login,register, auth} from './controllers.ts'
import authMiddleware from './authMiddleware.ts';

const router = new Router();

router
  .post('/login', login)
  .post('/register',register)
  .get('/auth', authMiddleware,  auth);

  export default router;