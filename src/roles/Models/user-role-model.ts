import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/Models/user.model";
import { Role } from "./role.model";
import { ApiProperty } from "@nestjs/swagger";


@Table({tableName: "user_roles", createdAt: false, updatedAt: false})
export class UserRole extends Model<UserRole> {
    @ApiProperty({example: 1, description: "Unikal ID"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id : number

    @ApiProperty({ example: "UserId", description: "Foydalanuvchining Idsi "})
    @ForeignKey(()=> User)
    @Column({
        type: DataType.INTEGER,
    })
    userId: number

    @ApiProperty({ example: "UserId", description: "rolening  Idsi "})
    @ForeignKey(()=> Role)
    @Column({
        type: DataType.INTEGER,
    })
    roleId: number
}