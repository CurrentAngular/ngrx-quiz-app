import { Component, inject } from '@angular/core';
import { quizStore } from '../store/quiz.store';

@Component({
  selector: 'aq-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrl: './congratulations.component.scss',
})
export class CongratulationsComponent {
  readonly store = inject(quizStore);
}
