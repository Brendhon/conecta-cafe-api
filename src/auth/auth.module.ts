import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../helpers/config/config.service';
import { CoffeeGrowerEntity } from '../coffee-grower/model/coffee-grower.entity';
import { CoffeeGrowerService } from '../coffee-grower/service/coffee-grower.service';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([CoffeeGrowerEntity]),
    PassportModule,
    JwtModule.register({
      secret: configService.getJwtToken(),
      signOptions: { expiresIn: '2 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CoffeeGrowerService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
