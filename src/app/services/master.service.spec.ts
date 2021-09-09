import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
    let masterService: MasterService;
    let valueServiceSpy: jasmine.SpyObj<ValueService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('ValueService', ['getValue']);

        TestBed.configureTestingModule({
            providers: [
                MasterService,
                { provide: ValueService, useValue: spy },
            ],
        });
        masterService = TestBed.inject(MasterService);
        valueServiceSpy = TestBed.inject(
            ValueService
        ) as jasmine.SpyObj<ValueService>;
    });

    it('#MasterService should be created', () => {
        expect(masterService).toBeTruthy();
    });

    it('#getValue should return faked value from a fake object', () => {
        const fake = { getValue: () => 'fake value' };
        masterService = new MasterService(fake as ValueService);
        expect(masterService.getValue()).toBe('fake value');
    });

    // Prefer spies as they are usually the easiest way to mock services.
    it('#getValue should return stubbed value from a spy', () => {
        // create `getValue` spy on an object representing the ValueService
        // set the value to return when the `getValue` spy is called.

        const stubValue = 'stub value';
        valueServiceSpy.getValue.and.returnValue(stubValue);

        masterService = new MasterService(valueServiceSpy);

        expect(masterService.getValue())
            .withContext('service returned stub value')
            .toBe(stubValue);
        expect(valueServiceSpy.getValue.calls.count())
            .withContext('spy method was called once')
            .toBe(1);
        expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(
            stubValue
        );
    });
});
