import { error } from "elysia";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Auth } from "./constant";

export class Exception {
  public static AuthException(err: unknown) {
    let message = Auth.error.unauthorized;
    if (err instanceof TokenExpiredError) {
      message = Auth.error.tokenExpired;
    } else if (err instanceof JsonWebTokenError) {
      console.error(err);
      message = err.message.includes(Auth.error.jwtAudienceInvalid)
        ? Auth.error.jwtAudienceInvalid
        : err.message.includes(Auth.error.jwtIssuerInvalid)
        ? Auth.error.jwtIssuerInvalid
        : message;
    }

    return error(Auth.code.unauthorized, message);
  }
}
