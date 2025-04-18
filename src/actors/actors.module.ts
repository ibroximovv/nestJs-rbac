import { Module } from '@nestjs/common';
import { ActorsService } from './actors.service';
import { ActorsController } from './actors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Actor, ActorSchema } from './entities/actor.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: Actor.name, schema: ActorSchema }])],
  controllers: [ActorsController],
  providers: [ActorsService],
})
export class ActorsModule {}
