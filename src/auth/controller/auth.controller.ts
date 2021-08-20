import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import ResponseFactory from '../../helpers/factory/response-factory';
import { LoginDTO } from '../dto/login.dto';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDTO })
  @ApiCreatedResponse({ description: 'Session created with success' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  async login(@Request() req: any) {
    return ResponseFactory(await this.authService.login(req.user));
  }
}
