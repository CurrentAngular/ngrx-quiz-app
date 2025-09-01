import { Component, inject } from '@angular/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'aq-congratulations',
  templateUrl: './congratulations.component.html',
  styleUrl: './congratulations.component.scss',
})
export class CongratulationsComponent {
  readonly store = inject(QuizService);
}
