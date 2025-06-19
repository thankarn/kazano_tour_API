import Elysia, { t } from "elysia";
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
      return await service.askAI(body);
    }, {
      body: 'reqAskModel',
      response: 'tripPlanResponseSchema'
    });
  }

  private _getPlaceDetail() {
    this._plugin.get("/place-detail/:id/:type", async ({ service, params }) => {
      return "todo implement get place detail";
    }, {
      params: t.Object({ id: t.String(), type: t.String() }),
    });
  }

  private _exception() {
    this._plugin.get("/exception", async () => { });
  }
}


const ask = new AskPlugin(e);
export default ask.plugin;
