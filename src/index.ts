import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
//import healthCheck from "./utils/plugin/health-check";
//import example from "./plugin/example/plugin";
import AskPlugin from "./plugin/openai/plugin";
//import { ai } from "./libs/log";

//ai.start();

const app = new Elysia()
  .use(cors())
  .use(swagger())
  //.use(healthCheck.plugin)
  .use(AskPlugin.plugin)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
