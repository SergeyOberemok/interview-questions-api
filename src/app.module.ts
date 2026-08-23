import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { MongoUriFactory } from './core/mongo';
import { LabelsModule } from './labels/labels.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: MongoUriFactory,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'public'),
        serveRoot: '/assets',
        exclude: ['/assets/*path'],
      },
      {
        rootPath: join(__dirname, '..', 'client'),
      },
    ),
    AuthModule,
    UsersModule,
    QuestionsModule,
    LabelsModule,
  ],
})
export class AppModule {}
