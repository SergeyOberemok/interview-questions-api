import { CreateLabelCommandHandler } from './create-label.handler';
import { CreateLabelIfNotExistCommandHandler } from './create-labels-if-not-exist.handler';

export * from './create-label.command';
export * from './create-labels-if-not-exist.command';

export const labelCommandHandlers = [
  CreateLabelCommandHandler,
  CreateLabelIfNotExistCommandHandler,
];
