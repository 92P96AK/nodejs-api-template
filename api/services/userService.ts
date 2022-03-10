import { userRepository } from "../repository"

export const createUser = (payload) => {
    return userRepository.createUser(payload)
}