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
    is_creator?: boolean;
    verified?: boolean;
}