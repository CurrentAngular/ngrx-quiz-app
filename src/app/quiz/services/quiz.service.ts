import { inject, Injectable } from '@angular/core';
import {
  QuestionBackendInterface,
  QuestionInterface,
  QuestionsResponse,
} from '../types';
import { HttpClient, HttpResourceRef } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { httpResource } from '@angular/common/http';

const URL =
  'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple&encode=url3986';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  #http = inject(HttpClient);

  // TODO: try to replace by httpResourse
  getQuestions(): Observable<QuestionInterface[]> {
    return this.#http
      .get<QuestionsResponse>(URL)
      .pipe(map(this.#questionsMapper));
  }

  load(): HttpResourceRef<QuestionInterface[] | undefined> {
    return httpResource<QuestionInterface[]>(() => URL);
  }

  #questionsMapper(questions: QuestionsResponse): QuestionInterface[] {
    const results = questions.results;

    return results.map((question: QuestionBackendInterface) => ({
      question: decodeURIComponent(question.question),
      correctAnswer: decodeURIComponent(question.correct_answer),
      incorrectAnswers: question.incorrect_answers.map((answer: string) =>
        decodeURIComponent(answer),
      ),
    }));
  }
}
