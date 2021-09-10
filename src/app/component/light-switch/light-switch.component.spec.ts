import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightSwitchComponent } from './light-switch.component';

describe('LightSwitchComponent', () => {
    let component: LightSwitchComponent;
    let fixture: ComponentFixture<LightSwitchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LightSwitchComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LightSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('#clicked() should toggle #isOn', () => {
        expect(component.isOn).withContext('off at first').toBe(false);
        component.clicked();
        expect(component.isOn).withContext('on after click').toBe(true);
        component.clicked();
        expect(component.isOn)
            .withContext('off after second click')
            .toBe(false);
    });

    it('#clicked() should set #message to "is on"', () => {
        expect(component.message)
            .withContext('off at first')
            .toMatch(/is off/i);
        component.clicked();
        expect(component.message)
            .withContext('on after clicked')
            .toMatch(/is on/i);
    });
});
