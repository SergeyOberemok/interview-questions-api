import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { lastValueFrom } from 'rxjs';
import { User } from 'src/users/models';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  public async validate(email: string, password: string): Promise<User> {
    const user = await lastValueFrom(this.authService.signIn(email, password));

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
