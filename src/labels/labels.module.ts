import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { labelCommandHandlers } from './commands';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { labelQueryHandlers } from './queries';
import { labelsRepositories } from './repositories';
import { Label, LabelSchema } from './schemas/label.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Label.name, schema: LabelSchema }]),
    CqrsModule,
  ],
  controllers: [LabelsController],
  providers: [
    LabelsService,
    ...labelsRepositories,
    ...labelCommandHandlers,
    ...labelQueryHandlers,
  ],
})
export class LabelsModule {}
