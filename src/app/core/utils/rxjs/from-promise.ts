import { Observable } from 'rxjs';

export function fromPromise<T>(promise: Promise<T>): Observable<T> {
  return new Observable(sub => {
    promise
      .then(result => sub.next(result))
      .catch(error => sub.error(error))
      .finally(() => sub.complete());
  });
}
