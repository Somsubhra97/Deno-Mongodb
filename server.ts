import { Application } from "https://deno.land/x/oak/mod.ts";
import router from './routes.ts'
import {connect} from './users_mongo';

const app = new Application();

connect();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({port: 8000});
console.log("Started on port: 8000");