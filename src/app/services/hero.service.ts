import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from 'rxjs/operators';
import { Hero } from '../model/hero';

@Injectable({
    providedIn: 'root',
})
export class HeroService {
    readonly heroesUrl = '/fake/api/heroes';

    constructor(private _http: HttpClient) {}

    getHeroes(): Observable<Hero[]> {
        return this._http.get<Hero[]>(this.heroesUrl).pipe(
            tap((heroes) => this.log(`fetched heroes`)),
            catchError(this.handleError('getHeroes'))
        ) as Observable<Hero[]>;
    }

    private handleError<T>(operation = 'operation') {
        return (error: HttpErrorResponse): Observable<T> => {
            console.error(error);

            const message =
                error.error instanceof ErrorEvent
                    ? error.error.message
                    : `server returned code ${error.status} with body "${error.error}"`;

            throw new Error(`${operation} failed: ${message}`);
        };
    }

    private log(message: string) {
        console.log('HeroService: ' + message);
    }
}
