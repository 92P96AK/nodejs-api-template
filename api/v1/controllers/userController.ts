import { UserService } from '../services'
import bcrypt from 'bcryptjs'
import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { jwtToken } from '../../../utils'
import {
   EMAIL_OR_USERNAME_EXIST,
   FAILED,
   FAILED_TO_CREATE_ACCOUNT,
   INVALID_CREDENTIALS,
   SIGN_UP_SUCCESSFULLY,
   SUCCESS,
} from '../../../constants'
export class UserController {
   private userService: UserService

   constructor() {
      this.userService = new UserService()
   }

   async addNewUser(req: Request, res: Response) {
      try {
         const payload: User = req.body
         const checkpayload: any = {
            email: payload.email,
            username: payload.username,
         }
         const dbUser = await this.userService.getOneUser(checkpayload)
         if (dbUser)
            throw {
               message: EMAIL_OR_USERNAME_EXIST,
            }
         payload.verified = false
         const salt = bcrypt.genSaltSync(10)
         payload.password = await bcrypt.hash(payload.password!, salt)
         const user = await this.userService.addNewUser(payload)
         res.apiSuccess({
            message: SIGN_UP_SUCCESSFULLY,
            data: {
               user,
               refreshToken: jwtToken(user.id),
               accessToken: jwtToken(user.id, 15), //access token valid for 15 days, after regenerate access token
            },
         })
      } catch (error: any) {
         res.apiFail({
            message: FAILED_TO_CREATE_ACCOUNT,
            error,
         })
      }
   }

   async getAllUser(_, res: Response) {
      try {
         const data = await this.userService.getAllUser()
         res.apiSuccess({
            message: SUCCESS,
            data,
         })
      } catch (error) {
         res.apiFail({
            message: FAILED,
            error,
         })
      }
   }

   async getOneUser(req: Request, res: Response) {
      try {
         const { id } = req.params
         const payload: any = {
            id,
         }
         const user = await this.userService.getOneUser(payload)

         const data = {
            user,
         }

         res.apiSuccess({
            message: SUCCESS,
            data,
         })
      } catch (error) {
         res.apiFail({
            message: FAILED,
            error,
         })
      }
   }

   public async login(req: Request, res: Response) {
      try {
         const { email, password } = req.body
         const payload: Partial<User> = {
            email,
         }
         const user = await this.userService.getOneUser(payload as User)
         if (!user)
            throw {
               message: INVALID_CREDENTIALS,
            }
         if (!bcrypt.compareSync(password, user.password!)) {
            throw {
               message: INVALID_CREDENTIALS,
            }
         }
         res.apiSuccess({
            message: SUCCESS,
            data: {
               user,
               token: jwtToken(user.id),
            },
         })
      } catch (error) {
         res.apiFail({
            message: FAILED,
            error,
         })
      }
   }

   public async getLoggedInUser(req: Request, res: Response) {
      try {
         const authUser: User = req.authUser
         return res.apiSuccess({
            data: authUser,
            message: SUCCESS,
         })
      } catch (error) {
         return res.apiFail({
            message: FAILED,
            error,
         })
      }
   }
}
