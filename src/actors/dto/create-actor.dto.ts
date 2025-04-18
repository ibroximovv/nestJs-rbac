import { ApiProperty } from "@nestjs/swagger"
import { IsMongoId, IsString } from "class-validator"
import mongoose from "mongoose"

export class CreateActorDto {
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    image: string

    @ApiProperty()
    @IsMongoId()
    films: string
}
