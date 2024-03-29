import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { jwtToken } from '../../utils'
import {
   ACCESS_TOKEN_FETCHED_SUCCESSFULLY,
   FAILED_TO_GET_ACCESS_TOKEN,
} from '../../constants'

export class TokenController {
   constructor() {
      // initialize
   }

   public async getAccessToken(req: Request, res: Response) {
      try {
         const authUser: User = req.authUser
         res.apiSuccess({
            message: ACCESS_TOKEN_FETCHED_SUCCESSFULLY,
            data: {
               accessToken: jwtToken(authUser.id, 15),
            },
         })
      } catch (error) {
         res.apiFail({
            message: FAILED_TO_GET_ACCESS_TOKEN,
            error,
         })
      }
   }
}
