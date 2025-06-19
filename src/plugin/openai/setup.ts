import Elysia from "elysia";
import { ExampleModel, ExampleModel2, ReqAskModel } from "./model";
import service from "./service";

export const Setup = new Elysia()
  .model({
    ex: ExampleModel.s,
    ex2: ExampleModel2.s,
    reqAskModel: ReqAskModel,
  })
  .decorate({ service });
