import Elysia from "elysia";
import { ExampleModel, ExampleModel2, ReqAskModel, TripPlanResponseSchema } from "./model";
import service from "./service";

export const Setup = new Elysia()
  .model({
    ex: ExampleModel.s,
    ex2: ExampleModel2.s,
    reqAskModel: ReqAskModel,
    tripPlanResponseSchema: TripPlanResponseSchema
  })
  .decorate({ service });
