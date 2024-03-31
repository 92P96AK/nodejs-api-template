import { Router } from 'express'
import { TokenController } from '../controllers'
import { VerifyRefreshToken } from '../../../utils'

export class TokenRoutes {
   public useRoutes: Router
   public tokenController: TokenController

   constructor() {
      this.useRoutes = Router({ mergeParams: true })
      this.setRoutes()
   }

   public setRoutes() {
      this.useRoutes.get(
         '/access',
         VerifyRefreshToken(),
         this.tokenController.getAccessToken.bind(this.tokenController),
      )
   }
}
