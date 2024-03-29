import { NextFunction, Request } from 'express'
import * as jwt from 'jsonwebtoken'
import { config } from '../infrastructure/env'
import { UserService } from '../api/services'
import { INVALID_TOKEN, UNAUTHORIZED } from '../constants'

export const VerifyUser = () => async (req: Request, _, next: NextFunction) => {
   try {
      let token = req.headers['authorization']
      token = token?.split(' ')[1]
      if (!token) {
         throw {
            message: INVALID_TOKEN,
         }
      }
      const decoded: any = jwt.verify(token, config.jwtSecret!)
      const userService = new UserService()
      const checkpayload: any = {
         id: decoded.id,
      }
      const user = await userService.getOneUser(checkpayload) // remove this later , check token list and expiry
      if (!user) {
         throw {
            message: INVALID_TOKEN,
         }
      }
      // eslint-disable-next-line prettier/prettier
      ;(<Request>req)['authUser'] = user

      next()
   } catch (error: any) {
      next({
         message: UNAUTHORIZED,
         error,
      })
   }
}

export const VerifyRefreshToken =
   () => async (req: Request, _, next: NextFunction) => {
      try {
         const { refreshToken } = req.body

         if (!refreshToken) {
            throw {
               message: INVALID_TOKEN,
            }
         }
         const decoded: any = jwt.verify(refreshToken, config.jwtSecret!)
         const userService = new UserService()
         const checkpayload: any = {
            id: decoded.id,
         }
         const user = await userService.getOneUser(checkpayload)
         if (!user) {
            throw {
               message: INVALID_TOKEN,
            }
         }
         // eslint-disable-next-line prettier/prettier
         ;(<Request>req)['authUser'] = user
         ;(<Request>req)['refreshToken'] = refreshToken

         next()
      } catch (error: any) {
         next({
            message: UNAUTHORIZED,
            error,
         })
      }
   }
