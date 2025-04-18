import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Actor } from './entities/actor.entity';
import { Model } from 'mongoose';
import { GetActorDto } from './dto/get-actor.dto';

@Injectable()
export class ActorsService {
  constructor(@InjectModel(Actor.name) private readonly actor: Model<Actor>){}
  async create(createActorDto: CreateActorDto) {
    try {
      const data = await this.actor.create(createActorDto)
      return data
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findAll(query: GetActorDto) {
    try {
      const { search, page = 1, limit = 10, film, order = 'desc', column = 'name'} = query;
      interface IFilterObj {
        name?: {$regex: string, $options: string}
        film?: string
      }

      let filter: IFilterObj = {}

      if (column == "name" && search) {
        filter.name = { $regex: search, $options: 'i' }
      }

      return await this.actor.find(filter).populate('films').sort({[column]: order === 'asc' ? 1 : -1 }).limit(limit).skip((page - 1) * limit)
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findOne(id: string) {
    try {
      const findOne = await this.actor.findById(id)
      if(!findOne) {
        throw new NotFoundException('Actor not found')
      }
      return findOne
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async update(id: string, updateActorDto: UpdateActorDto) {
    try {
      const findOne = await this.actor.findById(id)
      if(!findOne) {
        throw new NotFoundException('Actor not found')
      }
      return await this.actor.findByIdAndUpdate(id, updateActorDto, { new: true })
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async remove(id: string) {
    try {
      const findOne = await this.actor.findById(id)
      if(!findOne) {
        throw new NotFoundException('Actor not found')
      }
      return await this.actor.findByIdAndDelete(id)
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }
}
