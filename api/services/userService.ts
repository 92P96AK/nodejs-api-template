import { User } from '@prisma/client'
import { UserRepository } from '../repository'
export class UserService {
   private userRepo: UserRepository

   constructor() {
      this.userRepo = new UserRepository()
   }

   public async addNewUser(payload: User) {
      return await this.userRepo.addNewUser(payload)
   }

   public async getAllUser() {
      return await this.userRepo.getAllUser()
   }

   public async getOneUser(payload: User) {
      return await this.userRepo.getOneUser(payload)
   }
}
