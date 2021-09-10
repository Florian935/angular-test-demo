import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { Hero } from 'src/app/model/hero';

import { DashboardHeroComponent } from './dashboard-hero.component';

describe('DashboardHeroComponent', () => {
    let component: DashboardHeroComponent;
    let fixture: ComponentFixture<DashboardHeroComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardHeroComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardHeroComponent);
        component = fixture.componentInstance;
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
});
