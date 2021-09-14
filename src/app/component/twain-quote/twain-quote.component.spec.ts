import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
} from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TwainService } from 'src/app/services/twain.service';
import { TwainQuoteComponent } from './twain-quote.component';

describe('TwainQuoteComponent', () => {
    let component: TwainQuoteComponent;
    let fixture: ComponentFixture<TwainQuoteComponent>;
    let testQuote: string;
    let getQuoteSpy: jasmine.Spy;
    let quoteEl: HTMLElement;

    const errorMessage = () => {
        const el = fixture.nativeElement.querySelector('.error');
        return el ? el.textContent : null;
    };

    beforeEach(() => {
        testQuote = 'Test Quote';

        const twainService = jasmine.createSpyObj('TwainService', ['getQuote']);
        getQuoteSpy = twainService.getQuote.and.returnValue(of(testQuote));

        TestBed.configureTestingModule({
            declarations: [TwainQuoteComponent],
            providers: [{ provide: TwainService, useValue: twainService }],
        });

        fixture = TestBed.createComponent(TwainQuoteComponent);
        component = fixture.componentInstance;
        quoteEl = fixture.nativeElement.querySelector('.twain');
    });

    it('should not show quote before OnInit', () => {
        expect(quoteEl.textContent).withContext('nothing displayed').toBe('');
        expect(errorMessage())
            .withContext('should not show error element')
            .toBeNull();
        expect(getQuoteSpy.calls.any())
            .withContext('getQuote not yet called')
            .toBe(false);
    });

    it('should show quote after component initialized', () => {
        fixture.detectChanges();

        expect(quoteEl.textContent).toBe(testQuote);
        expect(getQuoteSpy.calls.any())
            .withContext('getQuote called')
            .toBe(true);
    });

    it('should display error when TwainService fails', fakeAsync(() => {
        getQuoteSpy.and.returnValue(
            throwError(() => 'TwainService test failure')
        );

        fixture.detectChanges();

        tick();

        fixture.detectChanges();

        expect(errorMessage())
            .withContext('should display error')
            .toMatch(/test failure/);
        expect(quoteEl.textContent)
            .withContext('should show placeholder')
            .toBe('...');
    }));
});
