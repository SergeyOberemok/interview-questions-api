import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SecureUserDto } from 'src/users/models';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  public login(@Request() request): SecureUserDto {
    const { email } = request.user;

    return { email };
  }
}
