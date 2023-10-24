import { IOClients } from "@vtex/api";

declare module "valtech-logger-npm" {
  import type { ServiceContext } from "@vtex/api";

  export type LogType = "Info" | "Error" | "Success" | "Warning";

  export interface LogFields {
    type: LogType;
    appName: string;
    shortDescription: string;
    additionalData?: any | string;
    component?: string;
    service?: string;
    path?: string;
    function?: string;
    user?: string;
  }

  export interface CreateLogResponse {
    status: number;
    success: boolean;
    Id?: string;
    Href?: string;
    DocumentId?: string;
    error?: string;
  }

  export type LoggerContext = ServiceContext<IOClients>;

  export class Logger {
    constructor(ctx: LoggerContext);
    saveLog(body: LogFields): Promise<CreateLogResponse>;
  }
}
