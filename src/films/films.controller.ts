import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { AuthorizaitonGuard } from 'src/authorizaiton/authorizaiton.guard';
import { RolesGuard } from 'src/roles/roles.guard';
import { RolesDecorator } from 'src/auth/decorators/role.decorator';
import { Roles } from 'src/auth/enum/roles.enum';
import { GetFilmDto } from './dto/get-film.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @RolesDecorator(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthorizaitonGuard)
  @Post()
  create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  findAll(@Query() query: GetFilmDto) {
    return this.filmsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(id);
  }

  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthorizaitonGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(id, updateFilmDto);
  }

  @RolesDecorator(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthorizaitonGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmsService.remove(id);
  }
}
