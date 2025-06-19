import * as jose from "jose";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import { KeyObject } from "node:crypto";
import { JwtPayload } from "./@types";
import { Auth } from "../../utils/constant";

type Key = {
  kid: string;
  use: string;
  kty: string;
  e: string;
  n: string;
  alg: string;
  crv: string;
  x5c: string[];
  isser: string;
};

export class JwksClient {
  constructor(private _url: string) {}

  private async _fetchKeys() {
    const response = await fetch(this._url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as { keys: Key[] };

    return data.keys;
  }

  private _resolveAlg(jwk: Key) {
    if (jwk.alg) {
      return jwk.alg;
    }

    if (jwk.kty === "RSA") {
      return "RS256";
    }

    if (jwk.kty === "EC") {
      switch (jwk.crv) {
        case "P-256":
          return "ES256";
        case "secp256k1":
          return "ES256K";
        case "P-384":
          return "ES384";
        case "P-521":
          return "ES512";
      }
    }

    if (jwk.kty === "OKP") {
      switch (jwk.crv) {
        case "Ed25519":
        case "Ed448":
          return "EdDSA";
      }
    }

    throw new Error("Unsupported JWK");
  }

  public async getKeys() {
    return await this._fetchKeys();
  }

  public async getSigningKey(kid: string) {
    const results = [];
    const keys = await this.getKeys();

    const jwks = keys
      .filter(({ use }: any) => use === "sig" || use === undefined)
      .filter(({ kty }: any) => kty === "RSA" || kty === "EC" || kty === "OKP");

    for (const jwk of jwks) {
      const key = (await jose.importJWK(
        jwk,
        this._resolveAlg(jwk)
      )) as jose.KeyLike;

      if (key.type !== "public") {
        continue;
      }

      let getSpki: () => string;

      switch ((key as any)[Symbol.toStringTag]) {
        case "CryptoKey": {
          getSpki = (): string => {
            const keyObject = KeyObject.from(key as CryptoKey);
            const spki = keyObject.export({
              format: "pem",
              type: "spki",
            }) as string;
            return spki;
          };
        }
        case "KeyObject":
        // Assume legacy Node.js version without the Symbol.toStringTag backported
        // Fall through
        default:
        //   getSpki = () => (key as any).export({ format: "pem", type: "spki" });
      }
      results.push({
        get publicKey() {
          return getSpki();
        },
        get rsaPublicKey() {
          return getSpki();
        },
        getPublicKey() {
          return getSpki();
        },
        ...(typeof jwk.kid === "string" && jwk.kid
          ? { kid: jwk.kid }
          : undefined),
        ...(typeof jwk.alg === "string" && jwk.alg
          ? { alg: jwk.alg }
          : undefined),
      });
    }

    return await results.find((key: any) => key.kid === kid)?.publicKey ?? "";
  }

  public async verify(token: string): Promise<JwtPayload | null> {
    try {
      // Decode the token to get the header and identify the key ID (kid)
      const decodedToken = jwt.decode(token, { complete: true });

      if (!decodedToken || typeof decodedToken === "string") {
        throw new Error("Invalid token");
      }

      const kid = decodedToken.header.kid!;
      const signingKey = await this.getSigningKey(kid);

      // Verify the token using the signing key
      console.log("Auth.aadAudience", Auth.aadAudience)
      const verifiedToken = jwt.verify(token, signingKey, {
        algorithms: ["RS256"],
        audience: Auth.aadAudience,
        issuer: Auth.aadIssuer
      }) as JwtPayload;

      return verifiedToken;
    } catch (error) {
      console.error("Token verification failed:", error);
      throw error;
    }
  }
}
