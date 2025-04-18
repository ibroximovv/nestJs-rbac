import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from './entities/film.entity';
import { Model } from 'mongoose';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private readonly film: Model<Film>){}
  async create(createFilmDto: CreateFilmDto) {
    try {
      return await this.film.create(createFilmDto);
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findAll() {
    try {
      return await this.film.find();
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async findOne(id: string) {
    try {
      const findOne = await this.film.findById(id)
      if (!findOne) {
        throw new NotFoundException('Film not found')
      }
      return findOne;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async update(id: string, updateFilmDto: UpdateFilmDto) {
    try {
      const findOne = await this.film.findById(id)
      if (!findOne) {
        throw new NotFoundException('Film not found')
      }
      return await this.film.findByIdAndUpdate(id, updateFilmDto, {new: true})
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }

  async remove(id: string) {
    try {
      const findOne = await this.film.findById(id)
      if (!findOne) {
        throw new NotFoundException('Film not found')
      }
      return await this.film.findByIdAndDelete(id)
    } catch (error) {
      throw new InternalServerErrorException('Internal server error')
    }
  }
}
