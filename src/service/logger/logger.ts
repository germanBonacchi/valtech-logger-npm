/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ServiceContext } from '@vtex/api'

import { createLog } from './createLog'
import type { Clients } from '../clients'

export type LogType = 'Info' | 'Error' | 'Success' | 'Warning'

export interface LogFields {
  type: LogType
  appName: string
  shortDescription: string
  additionalData?: any | string
  component?: string
  service?: string
  path?: string
  function?: string
  user?: string
}

export interface CreateLogResponse {
  status: number
  success: boolean
  Id?: string
  Href?: string
  DocumentId?: string
  error?: string
}

export type LoggerContext = ServiceContext<Clients>

export class Logger {
  private context: LoggerContext

  constructor(ctx: LoggerContext) {
    this.context = ctx
  }

  public saveLog = async (body: LogFields): Promise<CreateLogResponse> => {
    const createLogResponse = await createLog(this.context, body)

    return createLogResponse
  }
}
