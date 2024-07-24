import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LabelsModule } from './labels/labels.module';
import { QuestionsModule } from './questions/questions.module';
import { UsersModule } from './users/users.module';

console.log(process.env.NODE_ENV, process.env.NODE_ENV ? '.dev.env' : '.env');

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>('DATABASE_HOST');
        const db = configService.get<string>('DATABASE_DB');

        return { uri: `mongodb://${host}/${db}` };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: ['.dev.env'],
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
