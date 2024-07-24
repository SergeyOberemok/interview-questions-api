import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { LabelQueriesRepository, LabelRepository } from './repositories';
import { Label, LabelSchema } from './schemas/label.schema';

const services = [LabelsService];
const repositories = [LabelRepository, LabelQueriesRepository];

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Label.name, schema: LabelSchema }]),
  ],
  controllers: [LabelsController],
  providers: [...services, ...repositories],
  exports: [...services, ...repositories],
})
export class LabelsModule {}
