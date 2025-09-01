import { Component, inject } from '@angular/core';
import { quizStore } from '../store/quiz.store';

@Component({
  selector: 'aq-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrl: './error-notification.component.scss',
})
export class ErrorNotification {
  readonly store = inject(quizStore);
}
