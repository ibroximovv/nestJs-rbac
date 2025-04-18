import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateFilmDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    image: string

    @ApiProperty()
    @IsNumber()
    price: number
}
