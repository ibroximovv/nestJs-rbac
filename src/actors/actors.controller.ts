import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { RolesDecorator } from 'src/auth/decorators/role.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthorizaitonGuard } from 'src/authorizaiton/authorizaiton.guard';
import { Roles } from 'src/auth/enum/roles.enum';
import { GetActorDto } from './dto/get-actor.dto';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @RolesDecorator(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthorizaitonGuard)
  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorsService.create(createActorDto);
  }

  @Get()
  findAll(@Query() query: GetActorDto) {
    return this.actorsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorsService.findOne(id);
  }

  @RolesDecorator(Roles.ADMIN, Roles.SUPERADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthorizaitonGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorsService.update(id, updateActorDto);
  }

  @RolesDecorator(Roles.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthorizaitonGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorsService.remove(id);
  }
}
