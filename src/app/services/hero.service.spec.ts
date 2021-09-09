import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { defer } from 'rxjs';
import { Hero } from '../model/hero';

import { HeroService } from './hero.service';

describe('HeroService', () => {
    let heroService: HeroService;
    let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        heroService = new HeroService(httpClientSpy as any);
    });

    it('should return expected heroes (HttpClient called once)', (done: DoneFn) => {
        const expectedHeroes: Array<Hero> = [
            { id: 1, name: 'A' },
            { id: 2, name: 'B' },
        ];

        httpClientSpy.get.and.returnValue(
            defer(() => Promise.resolve(expectedHeroes))
        );

        heroService.getHeroes().subscribe((heroes: Array<Hero>) => {
            expect(heroes)
                .withContext('expected heroes')
                .toEqual(expectedHeroes);
            done();
        }, done.fail);

        expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
    });

    it('should return an error when the server returns a 404', (done: DoneFn) => {
        const errorMessage = new HttpErrorResponse({
            error: 'test 404 error',
            status: 404,
            statusText: 'Not Found',
        });

        httpClientSpy.get.and.returnValue(
            defer(() => Promise.reject(errorMessage))
        );

        heroService.getHeroes().subscribe(
            (heroes: Array<Hero>) => {
                done.fail('expected an error, not heroes');
            },
            (error: HttpErrorResponse) => {
                expect(error.message).toContain('test 404 error');
                done();
            }
        );
    });
});
