import { Component, inject } from '@angular/core';
import { AnswerComponent } from '../answer/answer.component';
import { QuizService } from '../services';

@Component({
  selector: 'aq-question',
  imports: [AnswerComponent],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent {
  readonly store = inject(QuizService);
}
