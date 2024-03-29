import { Router } from 'express'
import { TokenController } from '../controllers'
import { VerifyRefreshToken } from '../../utils'

export class TokenRoutes {
   public tokenRoutes: Router
   public tokenCOntroller: TokenController

   constructor() {
      this.tokenRoutes = Router({ mergeParams: true })
      this.setRoutes()
   }

   public setRoutes() {
      this.tokenRoutes.get(
         '/access',
         VerifyRefreshToken(),
         this.tokenCOntroller.getAccessToken.bind(this.tokenCOntroller),
      )
   }
}
