import { QuestionInterface } from '../types';

export interface QuizSlice {
  /** Сообщение об ошибке */
  error: string | null;
  /** Массив вопросов */
  questions: QuestionInterface[];
  /** Индекс текущего вопроса */
  currentQuestionIndex: number;
  /** Текущий вопрос */
  currentAnswer: string | null;
  /** Колличество правильных ответов */
  correctAnswersCount: number;
}

export const initialQuizState: QuizSlice = {
  error: null,
  questions: [],
  currentQuestionIndex: 0,
  currentAnswer: null,
  correctAnswersCount: 0,
};
