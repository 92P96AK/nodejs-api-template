import jwt from 'jsonwebtoken'
import { config } from '../infrastructure/env'

export const jwtToken = (id: string) => {
   const expireOn =
      Math.floor(Date.now() / 1000) + 60 * 60 * config.tokenValidationDays
   return jwt.sign(
      {
         exp: expireOn,
         id,
      },
      config.jwtSecret!,
   )
}
