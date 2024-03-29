import jwt from 'jsonwebtoken'
import { config } from '../infrastructure/env'

export const jwtToken = (
   id: string,
   expire: number = config.tokenValidationDays, // this validation is for refresh token, pass expire for access token
) => {
   return jwt.sign(
      {
         exp: Math.floor(Date.now() / 1000) + 60 * 60 * expire,
         id,
      },
      config.jwtSecret!,
      { algorithm: 'RS256' },
   )
}
