import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class User1646908416491 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "Users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    generationStrategy: "uuid",
                    isPrimary: true,
                    isUnique: true,
                },
                {
                    name: "username",
                    type: "varchar",
                    length: "50",
                    isUnique: true,
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "100",
                    isNullable: true,
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "50",
                    isUnique: true,
                },
                {
                    name: "statusMessage",
                    type: "varchar",
                    length: "300",
                    isNullable: true,
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "300",
                    isNullable: true,
                },
                {
                    name: "googleUserId",
                    type: "varchar",
                    length: "200",
                    isNullable: true,
                },
                {
                    name: "appleUserId",
                    type: "varchar",
                    length: "200",
                    isNullable: true,
                },
                {
                    name: "profileImageUrl",
                    type: "varchar",
                    length: "500",
                    isNullable: true,

                },
                {
                    name: "disabled",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "verified",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "isCreator",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "createdAt",
                    type: "timestamp",
                },
                {
                    name: "updatedAt",
                    type: "timestamp",
                },
                {
                    name: "deletedAt",
                    type: "timestamp",
                }
            ]
        }), true)

    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Users")
    }

}
