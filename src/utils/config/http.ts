
import { HttpClientFactory } from "@banpugroup/http-client";
import env from "./env";

export const http = new HttpClientFactory(
	`${env.ApiEndpoint}`,
	async () => "",
	"1.0.0",
	120000,
	[],
	[],
      );
      
      