import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Table,Model } from "sequelize-typescript";
import { Role } from "src/roles/Models/role.model";
import { UserRole } from "src/roles/Models/user-role-model";

interface RoleCreationAttre{
    name: string;
    email: string;
    password: string;
    is_active: boolean
}

@Table({tableName: "users"})
export class User extends Model<User, RoleCreationAttre> {
    
    @ApiProperty({example: 1, description: "Unikal ID"})
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id : number

    @ApiProperty({example: "user1", description: "Foydalanuvchi nomi"})
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    name : string

    @ApiProperty({example: "ilxommagidov@gmail.com", description: "Foydalanuvchi email"})
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: true,
    })
    email : string

    @ApiProperty({example: "ilX12$6om", description: "Foydalanuvchi password"})
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    password : string

    @ApiProperty({example: true, description: "Foydalanuvchi is_activeligi"})
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active : boolean

    @ApiProperty({example: ['roles'], description: "Foydalanuvchi rollari"})
    @BelongsToMany(()=> Role, () => UserRole)
    roles: Role[];
}