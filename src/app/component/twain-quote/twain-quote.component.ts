import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, startWith } from 'rxjs/operators';
import { TwainService } from 'src/app/services/twain.service';

@Component({
    selector: 'app-twain-quote',
    templateUrl: './twain-quote.component.html',
    styleUrls: ['./twain-quote.component.scss'],
})
export class TwainQuoteComponent implements OnInit {
    errorMessage!: string;
    quote!: Observable<string>;

    constructor(private _twainService: TwainService) {}

    ngOnInit(): void {
        this.getQuote();
    }

    getQuote() {
        this.errorMessage = '';
        this.quote = this._twainService.getQuote().pipe(
            startWith('...'),
            catchError((err: any) => {
                // Wait a turn because errorMessage already set once this turn
                setTimeout(
                    () => (this.errorMessage = err.message || err.toString())
                );
                return of('...'); // reset message to placeholder
            })
        );
    }
}
