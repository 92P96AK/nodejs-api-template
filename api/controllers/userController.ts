import { UserService } from '../services'
import bcrypt from 'bcryptjs'
import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { jwtToken } from '../../utils'
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
               message: 'Email or Username already exist',
            }
         payload.verified = false
         const salt = bcrypt.genSaltSync(10)
         payload.password = await bcrypt.hash(payload.password!, salt)
         const user = await this.userService.addNewUser(payload)
         res.apiSuccess({
            message: 'User Signed Up Successfully',
            data: {
               user,
               refreshToken: jwtToken(user.id),
               accessToken: jwtToken(user.id, 15), //access token valid for 15 days, after regenerate access token
            },
         })
      } catch (error: any) {
         res.apiFail({
            message: 'Failed to create account',
            error,
         })
      }
   }

   async getAllUser(_, res: Response) {
      try {
         const data = await this.userService.getAllUser()
         res.apiSuccess({
            message: 'User Fetched Successfully',
            data,
         })
      } catch (error) {
         res.apiFail({
            message: 'Failed to get users',
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
            message: 'User Fetched Successfully',
            data,
         })
      } catch (error) {
         res.apiFail({
            message: 'Failed to get user',
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
               message: 'Invalid Login Credential',
            }
         if (!bcrypt.compareSync(password, user.password!)) {
            throw {
               message: 'Invalid Login Credential',
            }
         }
         res.apiSuccess({
            message: 'Loggedin Successfully',
            data: {
               user,
               token: jwtToken(user.id),
            },
         })
      } catch (error) {
         res.apiFail({
            message: 'Failed to login',
            error,
         })
      }
   }

   public async getLoggedInUser(req: Request, res: Response) {
      try {
         const authUser: User = req.authUser
         return res.apiSuccess({
            data: authUser,
            message: 'LoggedIn user fetched successfully',
         })
      } catch (error) {
         return res.apiFail({
            message: 'Failed to get logged in user',
            error,
         })
      }
   }
}
