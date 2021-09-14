import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { Hero } from 'src/app/model/hero';

import { DashboardHeroComponent } from './dashboard-hero.component';

describe('DashboardHeroComponent', () => {
    let component: DashboardHeroComponent;
    let expectedHero: Hero;
    let fixture: ComponentFixture<DashboardHeroComponent>;
    let heroDe: DebugElement;
    let heroEl: HTMLElement;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DashboardHeroComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardHeroComponent);
        component = fixture.componentInstance;

        // find the hero's DebugElement and element
        heroDe = fixture.debugElement.query(By.css('.hero'));
        heroEl = heroDe.nativeElement;

        // mock the hero supplied by the parent component
        expectedHero = { id: 42, name: 'Test Name' };

        // simulate the parent setting the input property with that hero
        component.hero = expectedHero;

        // trigger initial data binding
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('raises the selected event when clicked', () => {
        const hero: Hero = { id: 42, name: 'Test' };
        component.hero = hero;

        component.selected.pipe(first()).subscribe((selectedHero: Hero) => {
            expect(selectedHero).toBe(hero);
        });

        component.click();
    });

    it('should display hero name in uppercase', () => {
        const expectedPipedName = expectedHero.name.toUpperCase();
        expect(heroEl.textContent).toContain(expectedPipedName);
    });

    it('should raise selected event when clicked (triggerEventHandler)', () => {
        let selectedHero: Hero | undefined;
        component.selected
            .pipe(first())
            .subscribe((hero: Hero) => (selectedHero = hero));

        heroDe.triggerEventHandler('click', null);
        expect(selectedHero).toBe(expectedHero);
    });

    it('should raise selected event when clicked (element.click)', () => {
        let selectedHero: Hero | undefined;
        component.selected
            .pipe(first())
            .subscribe((hero: Hero) => (selectedHero = hero));

        heroEl.click();
        expect(selectedHero).toBe(expectedHero);
    });
});
