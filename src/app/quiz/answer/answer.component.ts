import { Component, computed, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { quizStore } from '../store/quiz.store';

@Component({
  selector: 'aq-answer',
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.scss',
  imports: [NgClass],
})
export class AnswerComponent {
  readonly store = inject(quizStore);

  readonly answer = input.required<string>();
  readonly index = input.required<number>();

  readonly #LETTERS = ['a', 'b', 'c', 'd'];

  readonly letter = computed(() => this.#LETTERS[this.index()].toUpperCase());

  /** Ответ верный */
  readonly isAnswerCorrect = computed(
    () =>
      !!this.store.currentAnswer() &&
      this.answer() === this.store.currentQuestion().correctAnswer,
  );

  /** Ответ неверный */
  readonly isAnswerIncorrect = computed(
    () =>
      this.answer() === this.store.currentAnswer() &&
      this.store.currentAnswer() !== this.store.currentQuestion().correctAnswer,
  );
}
