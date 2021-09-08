import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ValueService {
    value = 'real value';

    getValue(): string {
        return this.value;
    }

    setValue(value: string): void {
        this.value = value;
    }

    getObservableValue(): Observable<string> {
        return of('observable value');
    }

    getPromiseValue(): Promise<string> {
        return Promise.resolve('promise value');
    }

    getObservableDelayValue(): Observable<string> {
        return of('observable delay value').pipe(delay(10));
    }
}
