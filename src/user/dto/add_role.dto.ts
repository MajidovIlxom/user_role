import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto{
    @ApiProperty({example: 1, description: "User ni IDsi"})
    readonly userId: number;
    
    @ApiProperty({example: 1, description: "User ni valuesi"})
    readonly value: string;
}