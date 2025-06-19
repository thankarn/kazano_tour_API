import { Type as t } from "@sinclair/typebox";
import { HttpMethod } from "@banpugroup/http-client";
import { ApiFactory } from "@banpugroup/api";
import { http } from "./http";

const apiFactory = new ApiFactory(http, {});

export const api = apiFactory.createService({
  getMewtwo: {
    url: `https://pokeapi.co/api/v2/pokemon/mewtwo`,
    method: t.Literal(HttpMethod.GET),
    response: t.Object({
      data: t.Any(),
    }),
    query: t.Undefined(),
    parameter: t.Undefined(),
    body: t.Undefined(),
  },
  getUserProfileByEmail: {
    url: `https://api2-dv.banpu.co.th/usr-api/api/v1/employees/profile/user-name?userName=Voralux_y`,
    method: t.Literal(HttpMethod.GET),
    response: t.Object({
      data: t.Any(),
    }),
    query: t.Undefined(),
    parameter: t.Undefined(),
    body: t.Undefined(),
  },
}).api;
