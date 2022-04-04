import { Response } from 'express'

export interface ResponseExtend extends Response {
   apiSuccess: (fn: ApiSuccess) => void
   apiFail: (fn: ApiFail) => void
}

interface ApiSuccess {
   message?: string
   data?: any
   status?: Status
}

export interface ApiFail {
   message?: string
   error?: any
   status?: Status
}

interface Status {
   code?: number
   success?: boolean
}
