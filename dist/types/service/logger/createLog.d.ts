import type { CreateLogResponse, LogFields, LoggerContext } from "./logger";
export declare function createLog(ctx: LoggerContext, fields: LogFields): Promise<CreateLogResponse>;
