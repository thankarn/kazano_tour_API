import Elysia from "elysia";
import { Setup } from "./setup";
import { PluginBase } from "../../utils/common/plugin";

const e = new Elysia({
  prefix: "/ask-ai",
}).use(Setup);

class AskPlugin<T extends typeof e> extends PluginBase<T> {
  constructor(private _plugin: T) {
    super(_plugin);
    super.run(this);
  }

  private _example() {
    this._plugin.get("/", async ({ service }) => {
      return "todo implement example";
    });
  }

  private _ask() {
    this._plugin.post("/", async ({ service, body }) => {
      return service.askAI(body);
    }, {
      body: 'reqAskModel',
    });
  }

  private _exception() {
    this._plugin.get("/exception", async () => { });
  }
}

export default new AskPlugin(e);
