import env from "../../utils/config/env";


export const Auth = {
	tenantId: `${env.TenantId}`,
	aadClientId: `${env.ClientId}`,
	jwksUrl: `https://login.microsoftonline.com/${env.TenantId}/discovery/v2.0/keys`,
	aadAudience: `api://${env.AdClientId}`,
	aadIssuer: `https://sts.windows.net/${env.TenantId}/`,
	aadScp: `${env.AdScope}`,
	code: {
	  unauthorized: 401,
	},
	value: {
	  system: "System",
	},
	error: {
	  unauthorized: "Unauthorized",
	  invalidToken: "Invalid token",
	  invalidScope: "Invalid scope",
	  tokenExpired: "Token has expired",
	  jwtAudienceInvalid: "Invalid audience",
	  jwtIssuerInvalid: "Invalid issuer",
	},
      };