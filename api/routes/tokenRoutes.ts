import { Router } from 'express'
import { TokenController } from '../controllers'
import { VerifyRefreshToken } from '../../utils'

export class TokenRoutes {
   public tokenRoutes: Router
   public tokenController: TokenController

   constructor() {
      this.tokenRoutes = Router({ mergeParams: true })
      this.setRoutes()
   }

   public setRoutes() {
      this.tokenRoutes.get(
         '/access',
         VerifyRefreshToken(),
         this.tokenController.getAccessToken.bind(this.tokenController),
      )
   }
}
