import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUppercase, IsString } from "class-validator";

export class CreateRoleDto {
    @ApiProperty({
        example: 'value',
        description: 'Foydalanuvchi valuesi',
    })
    @IsNotEmpty()
    @IsUppercase()
    @IsString()
    value: string;

    @ApiProperty({
        example: 'description',
        description: 'Foydalanuvchi description',
    })
    @IsNotEmpty()
    @IsString()
    description: string;
}

