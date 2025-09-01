import { Component, inject } from '@angular/core';
import { QuestionComponent } from './question/question.component';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { ErrorNotification } from './error-notification/error-notification.component';
import { quizStore } from './store/quiz.store';

@Component({
  selector: 'aq-quiz',
  imports: [QuestionComponent, CongratulationsComponent, ErrorNotification],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent {
  readonly store = inject(quizStore);

  constructor() {
    this.store.loadQuestions();
  }
}
