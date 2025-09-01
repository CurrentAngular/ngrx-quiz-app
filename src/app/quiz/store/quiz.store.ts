import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialQuizState } from './quiz.slice';
import { QuestionInterface } from '../types';
import { computed, inject } from '@angular/core';
import { pipe, switchMap, tap } from 'rxjs';
import { QuizService } from '../services';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

/** Сортировка ответов в случайном порядке */
function shuffleAnswers(question: QuestionInterface): string[] {
  const { correctAnswer, incorrectAnswers } = question;

  return [correctAnswer, ...incorrectAnswers]
    .map((answer) => ({
      id: Math.random(),
      value: answer,
    }))
    .sort((a, b) => a.id - b.id)
    .map((object) => object.value);
}

export const quizStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuizState),
  withComputed((store) => ({
    /** Колличество вопросов */
    questionsCount: computed(() => store.questions().length),
    /** Индекс текущего вопроса для отображения в UI */
    currentQuestionIndexToShow: computed(
      () => store.currentQuestionIndex() + 1,
    ),
    /** Текущий вопрос */
    currentQuestion: computed(
      () => store.questions()[store.currentQuestionIndex()],
    ),
    /** Вопросы завершены */
    showResult: computed(
      () => store.currentQuestionIndex() === store.questions().length - 1,
    ),
    /** Массив ответов на вопрос */
    currentQuestionAnswers: computed(() => {
      const question = store.questions()[store.currentQuestionIndex()];
      return question ? shuffleAnswers(question) : [];
    }),
  })),
  withMethods((store, quizService = inject(QuizService)) => ({
    setError(message: string): void {
      patchState(store, () => ({ error: message }));
    },
    setQuestions(questions: QuestionInterface[]): void {
      patchState(store, () => ({ questions }));
    },
    /** Перезапуск игры */
    restart(): void {
      patchState(store, () => ({ currentQuestionIndex: 0 }));
    },
    /** Переход к следующему вопросу */
    nextQuestion(): void {
      const currentIndex = store.showResult()
        ? store.currentQuestionIndex()
        : store.currentQuestionIndex() + 1;
      patchState(store, () => ({
        currentQuestionIndex: currentIndex,
        currentAnswer: null,
      }));
    },
    /** Выбор ответа */
    selectAnswer(answer: string): void {
      const correctAnswersCount =
        answer === store.currentQuestion().correctAnswer
          ? store.correctAnswersCount() + 1
          : store.correctAnswersCount();
      patchState(store, () => ({ currentAnswer: answer, correctAnswersCount }));
    },
    /** Загрузка вопросов */
    loadQuestions: rxMethod<void>(
      pipe(
        tap(() => patchState(store, () => ({ error: null }))),
        switchMap(() => {
          return quizService.getQuestions().pipe(
            tapResponse({
              next: (questions) => patchState(store, () => ({ questions })),
              error: ({ message }) =>
                patchState(store, () => ({ error: message })),
            }),
          );
        }),
      ),
    ),
  })),
);
