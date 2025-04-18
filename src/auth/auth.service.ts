import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserAuth } from './entities/auth.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserAuth.name) private readonly userAuth: Model<UserAuth>, private readonly jwt: JwtService){}

  async findUser(username: string){
    try {
      const data = await this.userAuth.findOne({username})
      return data
    } catch (error) {
      throw new BadRequestException(error.message || 'Find user failed')
    }
  }

  async register(createAuthDto: CreateAuthDto){
    try {
      const findUser = await this.findUser(createAuthDto.username)

      if (findUser) {
        throw new ConflictException('User already exists')
      }
      
      const hashedPassword = bcrypt.hashSync(createAuthDto.password, 10)
      const newUser = await this.userAuth.create({
        ...createAuthDto,
        password: hashedPassword
      })
      return newUser
    } catch (error) {
      throw new BadRequestException(error.message || 'Registration failed')
    }
  }

  async login(updateAuthDto: any) {
    try {
      const findUser = await this.findUser(updateAuthDto.username)
      if (!findUser) {
        throw new ConflictException('User not exists')
      }

      const matchPassword = bcrypt.compareSync(updateAuthDto.password, findUser.password)
      if (!matchPassword) {
        throw new BadRequestException('Password wrong error')
      }

      const token = this.jwt.sign({ id: findUser._id, role: findUser.role })
      return { token }
    } catch (error) {
      throw new BadRequestException(error.message || 'Login failed')
    }
  }
}
