import { Timestamp } from "typeorm";

export interface UserModel {
    id: string;
    username: string;
    name?: string;
    email: string;
    statusMessage?: string;
    password?: string;
    googleUserId?: string;
    appleUserId?: string;
    profileImageUrl?: string;
    disabled?: boolean;
    isCreator?: boolean;
    verified?: boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
    deletedAt?: Timestamp;
}