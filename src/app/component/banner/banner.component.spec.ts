import { DebugElement } from '@angular/core';
import {
    ComponentFixture,
    ComponentFixtureAutoDetect,
    TestBed,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
    let component: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;
    let h1: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [BannerComponent],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true },
            ],
        });
        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
        h1 = fixture.nativeElement.querySelector('h1');
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    it('should contain "banner works!', () => {
        const bannerElement: HTMLElement = fixture.nativeElement;
        expect(bannerElement.textContent).toContain('banner works!');
    });

    it('should have <p> with "banner works!"', () => {
        const bannerElement: HTMLElement = fixture.nativeElement;
        const p = bannerElement.querySelector('p');
        expect(p?.textContent).toEqual('banner works!');
    });

    it('should find the <p> with fixture.debugElement.nativeElement', () => {
        const bannerDebug: DebugElement = fixture.debugElement;
        const bannerElement: HTMLElement = bannerDebug.nativeElement;
        const p = bannerElement.querySelector('p')!;
        expect(p.textContent).toEqual('banner works!');
    });

    it('should find the <p> with fixture.debugElement.query(By.css)', () => {
        const bannerDebug: DebugElement = fixture.debugElement;
        const paragraphDebug = bannerDebug.query(By.css('p'));
        const p: HTMLElement = paragraphDebug.nativeElement;
        expect(p.textContent).toEqual('banner works!');
    });

    it('should display original title', () => {
        expect(h1.textContent).toContain(component.title);
    });

    it('should still see original title after comp.title change', () => {
        const oldTitle = component.title;
        component.title = 'Test title';
        // Displayed title is old because Angular didn't hear the change
        expect(h1.textContent).toContain(oldTitle);
    });

    it('should display updated title after detectChanges', () => {
        component.title = 'Test title';
        fixture.detectChanges();
        expect(h1.textContent).toContain(component.title);
    });
});
