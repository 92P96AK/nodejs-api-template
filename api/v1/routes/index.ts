import { Router } from 'express'
import { UserRoutes } from './userRoutes'
import { TokenRoutes } from './tokenRoutes'
export class Routes {
   public router: Router
   public userRoutes: UserRoutes
   public tokenRoutes: TokenRoutes
   constructor() {
      this.router = Router({ mergeParams: true })
      this.userRoutes = new UserRoutes()
      this.tokenRoutes = new TokenRoutes()
      this.setRoutes()
   }

   public setRoutes() {
      this.router.use('/user', this.userRoutes.userRouter)
      this.router.use('/token', this.tokenRoutes.useRoutes)
   }
}
