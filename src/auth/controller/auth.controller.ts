import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import ResponseFactory from '../../helpers/factory/response-factory';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return ResponseFactory(await this.authService.login(req.user));
  }
}
