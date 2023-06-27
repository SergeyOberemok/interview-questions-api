import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IUserToken } from 'src/users/models';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  public login(@Body() userDto: Record<string, any>): IUserToken {
    return { email: userDto.email, token: '123' };
  }
}
