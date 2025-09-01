import { Component } from '@angular/core';
import { QuizComponent } from './quiz/quiz.component';

@Component({
  selector: 'aq-root',
  imports: [QuizComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
