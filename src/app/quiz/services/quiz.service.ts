import { computed, inject, Injectable, signal } from '@angular/core';
import {
  QuestionBackendInterface,
  QuestionInterface,
  QuestionsResponse,
} from '../types';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const URL =
  'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple&encode=url3986';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  #http = inject(HttpClient);

  #currentQuestionIndex = signal(0);

  /** Массив вопросов */
  #questions = signal<QuestionInterface[]>([]);
  readonly questions = this.#questions.asReadonly();

  setQuestions(questions: QuestionInterface[]): void {
    this.#questions.set(questions);
  }

  /** Колличество вопросов */
  readonly questionsCount = signal(this.questions().length).asReadonly();

  /** Индекс текущего вопроса для отображения в UI */
  readonly currentQuestionIndexToShow = computed(
    () => this.#currentQuestionIndex() + 1,
  );

  /** Текущий вопрос */
  readonly currentQuestion = computed(
    () => this.questions()[this.#currentQuestionIndex()],
  );

  /** Индекс текущего вопроса */
  readonly currentQuestionIndex = signal(
    this.#currentQuestionIndex(),
  ).asReadonly();

  /** Переход к следующему вопросу */
  nextQuestion(): void {
    const currentIndex = this.showResult()
      ? this.#currentQuestionIndex()
      : this.#currentQuestionIndex() + 1;

    this.#currentAnswer.set(null);
    this.#currentQuestionIndex.set(currentIndex);
  }

  /** Перезапуск игры */
  restart(): void {
    this.#currentQuestionIndex.set(0);
  }

  readonly showResult = computed(
    () => this.#currentQuestionIndex() === this.#questions().length - 1,
  );

  /** Массив ответов на вопрос */
  readonly currentQuestionAnswers = computed(() =>
    this.#shuffleAnswers(this.currentQuestion()),
  );

  /** Сортировка ответов в случайном порядке */
  #shuffleAnswers(question: QuestionInterface): string[] {
    const { correctAnswer, incorrectAnswers } = question;

    return [correctAnswer, ...incorrectAnswers]
      .map((answer) => ({
        id: Math.random(),
        value: answer,
      }))
      .sort((a, b) => a.id - b.id)
      .map((object) => object.value);
  }

  #currentAnswer = signal<string | null>(null);
  readonly currentAnswer = this.#currentAnswer.asReadonly();

  #correctAnswersCount = signal<number>(0);
  readonly correctAnswersCount = this.#correctAnswersCount.asReadonly();

  selectAnswer(answer: string): void {
    this.#currentAnswer.set(answer);
    const correctAnswersCount =
      answer === this.currentQuestion().correctAnswer
        ? this.#correctAnswersCount() + 1
        : this.#correctAnswersCount();

    this.#correctAnswersCount.set(correctAnswersCount);
  }

  // TODO: try to replace by httpResourse
  getQuestions(): Observable<QuestionInterface[]> {
    return this.#http
      .get<QuestionsResponse>(URL)
      .pipe(map(this.#questionsMapper));
  }

  #questionsMapper(questions: QuestionsResponse): QuestionInterface[] {
    const temp = questions.results;

    return temp.map((question: QuestionBackendInterface) => ({
      question: decodeURIComponent(question.question),
      correctAnswer: decodeURIComponent(question.correct_answer),
      incorrectAnswers: question.incorrect_answers.map((answer: string) =>
        decodeURIComponent(answer),
      ),
    }));
  }
}
