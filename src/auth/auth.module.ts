import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserAuth, UserAuthSchema } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserAuth.name, schema: UserAuthSchema }]), 
    JwtModule.register({
      secret: 'nimadir',
      global: true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
