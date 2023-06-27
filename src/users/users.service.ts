import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from, Observable } from 'rxjs';
import { IUser, User } from './models';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public findAll(): Observable<User[]> {
    const usersResult = this.userModel.find().exec();

    return from(usersResult);
  }

  public findOne(email: string): Observable<User> {
    const userResult = this.userModel.findOne({ email }).exec();

    return from(userResult);
  }

  public create(createUserDto: IUser): Observable<User> {
    const userResult = new this.userModel(createUserDto).save();

    return from(userResult);
  }
}
