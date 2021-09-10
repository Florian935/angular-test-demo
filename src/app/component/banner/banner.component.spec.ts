import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {
    let component: BannerComponent;
    let fixture: ComponentFixture<BannerComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [BannerComponent] });
        fixture = TestBed.createComponent(BannerComponent);
        component = fixture.componentInstance;
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
});
