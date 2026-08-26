import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { IUser, User } from './models';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Observable<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  @ApiBody({ type: User })
  create(@Body() createUserDto: IUser): Observable<User> {
    return this.usersService.create(createUserDto);
  }
}
