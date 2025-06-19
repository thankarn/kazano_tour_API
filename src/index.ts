import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
//import healthCheck from "./utils/plugin/health-check";
//import example from "./plugin/example/plugin";
import AskPlugin from "./plugin/openai/plugin";
//import { ai } from "./libs/log";

//ai.start();

const port = process.env.PORT || 3000;
const app = new Elysia()
  .use(cors())
  .use(swagger())
  //.use(healthCheck.plugin)
  .use(AskPlugin)
  .listen(port);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
