import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongoUriFactory } from './core/shared';
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
    ConfigModule.forRoot({
      envFilePath: [
        process.env.NODE_ENV?.trim() === 'prod' ? '.env' : '.dev.env',
      ],
    }),
    AuthModule,
    UsersModule,
    QuestionsModule,
    LabelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
