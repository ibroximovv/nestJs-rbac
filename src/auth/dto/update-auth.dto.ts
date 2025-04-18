import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
    @ApiProperty({example: 'alex'})
    @IsString()
    username: string

    @ApiProperty({example: 'alex1234'})
    @IsString()
    password: string
}
