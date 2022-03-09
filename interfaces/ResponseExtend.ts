import { Response } from "express";

export interface ResponseExtend extends Response {
    apiSuccess: () => ApiSuccess;
    apiFail: () => ApiFail;
}

interface ApiSuccess {
    message?: string
    data?: any
    status?: Status
}

interface ApiFail {
    message?: string
    error?: any
    status?: Status
}

interface Status {
    code?: number
    success?: boolean
}