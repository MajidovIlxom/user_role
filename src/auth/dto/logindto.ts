import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

export class LoginDto {
    @ApiProperty({example: "ilxommagidov@gmail.com", description: "Foydalanuvchi email addressi"})
    @IsEmail()
    email: string;
    
    @ApiProperty({example: "ilX12$6om", description: "Foydalanuvchi password"})
    @IsStrongPassword()
    password: string;
}