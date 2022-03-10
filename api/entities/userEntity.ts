import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    statusMessage: string;

    @Column()
    password: string;

    @Column()
    googleUserId: string;

    @Column()
    appleUserId: string;

    @Column()
    verified: boolean;

    @Column()
    profileImageUrl: string;

    @Column()
    disabled: boolean;

    @Column()
    is_creator: boolean;

}
