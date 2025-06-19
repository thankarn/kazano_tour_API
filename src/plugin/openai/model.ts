import { t, type Static } from "elysia";
import { Extract } from "../../utils/common";

export const ExampleModel = Extract(t.Object({
  name: t.String(),
}));

export const ExampleModel2 = Extract(t.Object({
  test: t.String(),
}));


export const ReqAskModel = t.Object({
  userMessage: t.String(),
});

export type reqAskModel = Static<typeof ReqAskModel> 