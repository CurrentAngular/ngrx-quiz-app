import { Component, inject } from '@angular/core';
import { AnswerComponent } from '../answer/answer.component';
import { quizStore } from '../store/quiz.store';

@Component({
  selector: 'aq-question',
  imports: [AnswerComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  readonly store = inject(quizStore);
}
