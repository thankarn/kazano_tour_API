import Elysia from "elysia";
import { PluginBase } from "../common/plugin";

const e = new Elysia({
  prefix: "/health-check",
});

class HealthCheck<T extends typeof e> extends PluginBase<T> {
  constructor(private _plugin: T) {
    super(_plugin);
    super.run(this);
  }

  private _healthCheck() {
    this._plugin.get("/", () => {
      return {
        message: "Hello Banpu 🦊",
      };
    });
  }
}


export default new HealthCheck(e);