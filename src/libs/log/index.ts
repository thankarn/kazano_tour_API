import appInsights from "applicationinsights";
import { createLogger, format, transports } from "winston";
import env from "../../utils/config/env";

// const AzureApplicationInsightsLogger = require("winston-azure-application-insights");

// Maximum number of log 32768
export const ai = appInsights
  .setup(env.AppInsConnection)

  // export const ai = appInsights.setup("a403c7ff-8c69-423a-af70-79646e7ad75c")
  // .setAutoCollectRequests(true)
  // .setAutoCollectPerformance(true, true)
  // .setAutoCollectExceptions(true)

  // .setAutoDependencyCorrelation(true)
  // .setAutoCollectDependencies(true)

  // .setAutoCollectPreAggregatedMetrics(true)
  .setSendLiveMetrics(true)
  //     .setInternalLogging(true, true)
  // .enableWebInstrumentation(true)
  .setAutoCollectConsole(true, true);
// .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C);

//   appInsights.defaultClient.context.tags[
//     appInsights.defaultClient.context.keys.cloudRole
// ] = 'doa-api'

// .enableWebInstrumentation(false)
//     .start();

export default createLogger({
  format: format.json(),
  // transports: [new transports.Console()],
});
