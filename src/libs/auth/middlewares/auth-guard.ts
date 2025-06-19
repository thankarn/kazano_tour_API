import Elysia, { Context, error } from "elysia";
// import { isAuthenticated } from "./is-authenticated";
import { JwtPayload } from "jsonwebtoken";
import { intersection, some } from "lodash";
import { Auth } from "../constant";

export const authGuard = (roles: string[]) => {
  return (app: Elysia) =>
    app.derive(async function handler(ctx) {
      const { jwtPayload } = ctx as typeof ctx & { jwtPayload: JwtPayload };
      if (!jwtPayload || !some(intersection(jwtPayload.roles, roles)))
        return error(
          Auth.code.unauthorized,
          "The role provided is invalid or not authorized to perform this action."
        );
    });
};
