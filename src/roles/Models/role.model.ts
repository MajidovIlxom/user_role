import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "src/user/Models/user.model";
import { UserRole } from "./user-role-model";
import { ApiProperty } from "@nestjs/swagger";



interface RoleCreationAttre{
    value: string;
    description: string;
}

@Table({tableName: "roles"})
export class Role extends Model<Role, RoleCreationAttre> {
    @ApiProperty({example: 1, description: "Unikal ID"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id : number

    @ApiProperty({ example: "value", description: "description"})
    @Column({
        type: DataType.STRING,
    })
    value: string

    @ApiProperty({ example: "description", description: "Bu yerga description yoziladi"})
    @Column({
        type: DataType.STRING,
    })
    description: string

    @ApiProperty({ example: ["users"], description: "Foydalanuvchi va uning rollari"})
    @BelongsToMany(()=> User, ()=> UserRole)
    users: User[]
}