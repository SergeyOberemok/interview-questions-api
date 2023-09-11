export interface IQuestion {
  description: string;
  answers: string[];
}

export class Question implements IQuestion {
  description: string;
  answers: string[];
}
