export interface IQuestion {
  description: string;
  answers: string[];
  labels: string[];
}

export class Question implements IQuestion {
  description: string;
  answers: string[];
  labels: string[];
}
