import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CoffeeGrowerService } from '../../coffee-grower/service/coffee-grower.service';
import { CoffeeGrowerEntity } from '../../coffee-grower/model/coffee-grower.entity';

@Injectable()
export class AuthService {
  constructor(
    private growerService: CoffeeGrowerService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.growerService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      return isMatch ? { id: user.id } : null;
    } else return null;
  }

  async login(user: CoffeeGrowerEntity) {
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
