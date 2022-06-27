import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { CreateUserDto, User, UserDocument } from './models';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public findAll(): Observable<User[]> {
    const users = this.userModel.find().exec();

    return from(users);
  }

  public findOne(email: string): Observable<User> {
    const user = this.userModel.findOne({ email }).exec();

    return from(user);
  }

  public create(createUserDto: CreateUserDto): Observable<User> {
    const user = new this.userModel(createUserDto);

    return from(user.save());
  }
}
