import { User } from '@prisma/client'
import { RequestQueryDto } from '../../interfaces'

declare global {
   namespace Express {
      interface Request {
         authUser: User
         requestQuery: RequestQueryDto
      }
      interface Response {
         apiSuccess: (fn: ApiSuccess) => void
         apiFail: (fn: ApiFail) => void
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
   }
}
