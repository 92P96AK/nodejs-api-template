import { EntitySchema } from "typeorm";


export const User = new EntitySchema({
    name: "Users",
    columns: {
        id: {
            type: "uuid",
            primary: true,
            generated: true,
            unique: true
        },
        username: {
            type: "varchar",
            unique: true,
            nullable: false,

        },
        name: {
            type: "varchar"
        },
        email: {
            type: "varchar",
            unique: true,
            nullable: false,
        },
        statusMessage: {
            type: "varchar",
            nullable: true
        },
        password: {
            type: "varchar",
            nullable: true
        },
        googleUserId: {
            type: "varchar",
            nullable: true
        },
        appleUserId: {
            type: "varchar",
            nullable: true
        },
        profileImageUrl: {
            type: "varchar",
            nullable: true
        },
        disabled: {
            type: "boolean",
            default: false
        },
        isCreator: {
            type: "boolean",
            default: false
        },
        verified: {
            type: "boolean",
            default: false
        },
        createdAt: {
            type: "timestamp with time zone",
            createDate: true
        },
        updatedAt: {
            type: "timestamp with time zone",
            updateDate: true
        },
        deletedAt: {
            type: "timestamp with time zone",
            deleteDate: true
        }
    }
});


// @Entity("Users")
// export class User {

//     @PrimaryGeneratedColumn("uuid")
//     id: string;

//     @Column()
//     username: string;

//     @Column()
//     name: string;

//     @Column()
//     email: string;

//     @Column()
//     statusMessage: string;

//     @Column()
//     password: string;

//     @Column()
//     googleUserId: string;

//     @Column()
//     appleUserId: string;

//     @Column({ default: false })
//     verified: boolean;

//     @Column()
//     profileImageUrl: string;

//     @Column({ default: false })
//     disabled: boolean;

//     @Column({ default: false })
//     is_creator: boolean;

//     @Column()
//     @CreateDateColumn()
//     createdAt: Timestamp;

//     @Column()
//     @UpdateDateColumn()
//     updatedAt: Timestamp

//     @Column()
//     @DeleteDateColumn()
//     deletedAt: Timestamp;

// }
