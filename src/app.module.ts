import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ActorsModule } from './actors/actors.module';
import { FilmsModule } from './films/films.module';
import { MulterController } from './multer/multer.controller';

@Module({
  imports: [AuthModule, MongooseModule.forRoot('mongodb://localhost/nest-homework11'), ActorsModule, FilmsModule],
  controllers: [AppController, MulterController],
  providers: [AppService],
})
export class AppModule {}
