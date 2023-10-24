/* eslint-disable no-await-in-loop */

import {
  LOGS_DATA_ENTITY as dataEntity,
  LOGS_SCHEMA_NAME as schema,
} from "./utils/constants";
import { sleep } from "./utils/sleep";
import type { CreateLogResponse, LogFields, LoggerContext } from "./logger";

export async function createLog(
  ctx: LoggerContext,
  fields: LogFields
): Promise<CreateLogResponse> {
  const {
    clients: { masterdata },
  } = ctx;

  const maxRetries = 10;
  const retryDelay = 1500;

  for (let retryNumber = 0; retryNumber < maxRetries; retryNumber++) {
    try {
      const saveLogResponse = await masterdata.createOrUpdatePartialDocument({
        dataEntity,
        schema,
        fields,
      });

      return {
        status: 200,
        success: true,
        ...saveLogResponse,
      };
    } catch (error: any) {
      await sleep(retryDelay);
      if (retryNumber >= maxRetries - 1) {
        return {
          status: error?.status ? error?.status : 500,
          success: false,
          error: error?.message
            ? error?.message
            : "There was an issue processing your request. Please try again later.",
        };
      }
    }
  }

  return {
    status: 500,
    success: false,
    error: "Unexpected error",
  };
}
