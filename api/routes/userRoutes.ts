import { Router } from 'express'
import { UserController } from '../controllers'
import { VerifyUser, Validate } from '../../utils'
import { newUser, login } from '../validation'

export class UserRoutes {
   public userRouter: Router
   public userController: UserController

   constructor() {
      this.userRouter = Router({ mergeParams: true })
      this.userController = new UserController()
      this.setRoutes()
   }

   public setRoutes() {
      this.userRouter.post(
         '/create',
         Validate(newUser),
         this.userController.addNewUser.bind(this.userController),
      )
      this.userRouter.post(
         '/login',
         Validate(login),
         this.userController.login.bind(this.userController),
      )
      this.userRouter.get(
         '/',
         VerifyUser(),
         this.userController.getAllUser.bind(this.userController),
      )
      this.userRouter.get(
         '/:id',
         VerifyUser(),
         this.userController.getOneUser.bind(this.userController),
      )
   }
}
