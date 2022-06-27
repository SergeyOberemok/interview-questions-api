import { Injectable } from '@nestjs/common';
import { iif, mergeMap, Observable, of, take } from 'rxjs';
import { User } from 'src/users/models';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public validateUser(email: string, password: string): Observable<User> {
    return this.usersService.findOne(email).pipe(
      mergeMap((user: User) =>
        iif(() => user && user.password === password, of(user), of(null)),
      ),
      take(1),
    );
  }
}
