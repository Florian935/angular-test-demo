import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
    let service: ValueService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ValueService);
    });

    it('#ValueService should be created', () => {
        expect(service).toBeTruthy();
    });

    it('#getValue should return "real value"', () => {
        expect(service.getValue()).toBe('real value');
    });

    it('#setValue with input "hello world" then #getValue return "hello world"', () => {
        service.setValue('hello world');
        expect(service.getValue()).toBe('hello world');
    });

    it('#getObservableValue should return "observable value" from observable', (done: DoneFn) => {
        service.getObservableValue().subscribe((value) => {
            expect(value).toBe('observable value');
            done();
        });
    });

    it('#getPromiseValue should return "promise value" from a promise', (done: DoneFn) => {
        service.getPromiseValue().then((value: string) => {
            expect(value).toBe('promise value');
            done();
        });
    });

    it('test should wait for ValueService#getObservableDelayValue', (done: DoneFn) => {
        service.getObservableDelayValue().subscribe((value: string) => {
            expect(value).toBe('observable delay value');
            done();
        });
    });
});
