import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        example: 'user1',
        description: 'Foydalanuvchi nomi'
    })

    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'ilxommagidov@gmail.com',
        description: 'Foydalanuvchining emaili'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'ilX12$6om',
        description: 'Foydalanuvchining passwordi'
    })
    @IsStrongPassword()
    password: string;
}
