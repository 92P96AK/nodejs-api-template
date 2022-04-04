import { NextFunction, Request } from 'express'
import * as jwt from 'jsonwebtoken'
import { config } from '../infrastructure/env'
import { UserService } from '../api/services'

export const VerifyUser = () => async (req: Request, _, next: NextFunction) => {
   try {
      let token = req.headers['authorization']
      token = token?.split(' ')[1]
      if (!token) {
         throw {
            message: 'Invalid Token',
         }
      }
      const decoded: any = jwt.verify(token, config.jwtSecret!)
      const userService = new UserService()
      const checkpayload: any = {
         id: decoded.id,
      }
      const user = await userService.getOneUser(checkpayload)
      if (!user) {
         throw {
            message: 'Invalid Token',
         }
      }
      // eslint-disable-next-line prettier/prettier
      (<Request>req)['authUser'] = user

      next()
   } catch (error: any) {
      next({
         message: 'Unauthorized User',
         error,
      })
   }
}
