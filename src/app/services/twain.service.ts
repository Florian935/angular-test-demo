import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, of, throwError } from 'rxjs';
import { concatWith, map, retryWhen, switchMap, take } from 'rxjs/operators';
import { Quote } from '../model/quote';

@Injectable({
    providedIn: 'root',
})
export class TwainService {
    constructor(private _http: HttpClient) {}

    private nextId = 1;

    getQuote(): Observable<string> {
        return new Observable((observer: Observer<number>) =>
            observer.next(this.nextId++)
        ).pipe(
            switchMap((id: number) =>
                this._http.get<Quote>(`api/quotes/${id}`)
            ),
            map((q: Quote) => q.quote),
            retryWhen((errors) =>
                errors.pipe(
                    switchMap((error: HttpErrorResponse) => {
                        if (error.status === 404) {
                            this.nextId = 1;
                            return of(null);
                        }
                        console.error(error);
                        return throwError(
                            () => 'Cannot get Twain quotes from the server'
                        );
                    }),
                    take(2),
                    concatWith(throwError(() => 'There are no Twain quotes'))
                )
            )
        );
    }
}
