import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsString } from "class-validator"
import { Roles } from "../enum/roles.enum"

export class CreateAuthDto {
    @ApiProperty({example: 'alex'})
    @IsString()
    username: string

    @ApiProperty({example: 'alex1234'})
    @IsString()
    password: string

    @ApiProperty({enum: Roles, default: Roles.USER})
    @IsEnum(Roles)
    role: Roles
}
