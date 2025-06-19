import {  type Elysia } from "elysia";
import { bearer } from "@elysiajs/bearer";

import jwtAccess from "..";
import { JsonWebTokenError, JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { Exception } from "../error";
import { Auth } from "../constant";

export const isAuthenticated = (app: Elysia) =>
  app
    .use(bearer())
    .derive(async function handler({ bearer, set, store, request: { headers } }) {
      let payload: JwtPayload | null;
      try {
        if (!bearer) throw new JsonWebTokenError(Auth.error.unauthorized);

        payload = await jwtAccess.verify(bearer);

        if (!payload) throw new JsonWebTokenError(Auth.error.invalidToken);
        // TODO: remove comment
        // if (!payload.scp || !payload.scp.includes(Auth.aadScp))
        //   throw new JsonWebTokenError(Auth.error.invalidScope);

        return {
          jwtPayload: payload,
        };
      } catch (e) {
        set.status = Auth.code.unauthorized;
        return Exception.AuthException(e);
      }
    });
