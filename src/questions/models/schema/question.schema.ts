import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question } from '../entities/question.entity';

export type QuestionDocument = Question & Document;

export const QuestionSchema = SchemaFactory.createForClass(Question);
