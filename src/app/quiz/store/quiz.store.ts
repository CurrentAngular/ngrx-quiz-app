import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { initialQuizState } from './quiz.slice';

export const quizStore = signalStore(
  { providedIn: 'root' },
  withState(initialQuizState),
  withMethods((store) => ({
    setError(message: string): void {
      patchState(store, () => ({ error: message }));
    },
  })),
);
