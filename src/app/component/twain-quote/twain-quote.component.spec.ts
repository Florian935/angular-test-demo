import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync,
} from '@angular/core/testing';
import { defer, throwError } from 'rxjs';
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
        getQuoteSpy = twainService.getQuote.and.returnValue(
            defer(() => Promise.resolve(testQuote))
        );

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

    it('should show quote after getQuote (fakeAsync)', fakeAsync(() => {
        fixture.detectChanges();
        expect(quoteEl.textContent)
            .withContext('should show placeholder')
            .toBe('...');

        tick();
        fixture.detectChanges();

        expect(quoteEl.textContent)
            .withContext('should show quote')
            .toBe(testQuote);
        expect(errorMessage()).withContext('should not show error').toBeNull();
    }));

    it(
        'should show quote after getQuote (waitForAsync)',
        waitForAsync(() => {
            fixture.detectChanges();
            expect(quoteEl.textContent)
                .withContext('should show placeholder')
                .toBe('...');

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(quoteEl.textContent).toBe(testQuote);
                expect(errorMessage())
                    .withContext('should not show error')
                    .toBeNull();
            });
        })
    );

    it('should show quote after getQuote (spy done)', (done: DoneFn) => {
        fixture.detectChanges();

        getQuoteSpy.calls.mostRecent().returnValue.subscribe(() => {
            fixture.detectChanges();
            expect(quoteEl.textContent).toBe(testQuote);
            expect(errorMessage())
                .withContext('should not show error')
                .toBeNull();
            done();
        });
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
