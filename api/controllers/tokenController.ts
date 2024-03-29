import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { jwtToken } from '../../utils'

export class TokenController {
   constructor() {
      // initialize
   }

   public async getAccessToken(req: Request, res: Response) {
      try {
         const authUser: User = req.authUser
         res.apiSuccess({
            message: 'Access Token',
            data: {
               accessToken: jwtToken(authUser.id, 15),
            },
         })
      } catch (error) {
         res.apiFail({
            message: 'Failed to get token',
            error,
         })
      }
   }
}
