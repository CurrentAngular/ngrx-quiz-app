import { Component, inject, OnInit } from '@angular/core';
import { QuestionComponent } from './question/question.component';
import { QuizService } from './services';
import { CongratulationsComponent } from './congratulations/congratulations.component';
import { QuestionInterface } from './types';
import { ErrorNotification } from './error-notification/error-notification.component';
import { quizStore } from './store/quiz.store';

@Component({
  selector: 'aq-quiz',
  imports: [QuestionComponent, CongratulationsComponent, ErrorNotification],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnInit {
  readonly store = inject(QuizService);
  readonly state = inject(quizStore);

  // TODO: try to move into service
  ngOnInit(): void {
    this.store.getQuestions().subscribe({
      next: (questions: QuestionInterface[]) => {
        this.store.setQuestions(questions);
      },
      error: (error) => {
        this.state.setError(error.message);
      },
    });
  }
}
