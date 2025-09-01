export interface QuestionBackendInterface {
  readonly type: string;
  readonly difficulty: string;
  readonly category: string;
  readonly question: string;
  readonly correct_answer: string;
  readonly incorrect_answers: string[];
}

export interface QuestionsResponse {
  results: QuestionBackendInterface[];
}
