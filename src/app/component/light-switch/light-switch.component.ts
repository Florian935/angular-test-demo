import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-light-switch',
    templateUrl: './light-switch.component.html',
    styleUrls: ['./light-switch.component.scss'],
})
export class LightSwitchComponent {
    isOn = false;

    clicked(): void {
        this.isOn = !this.isOn;
    }

    get message(): string {
        return `The light is ${this.isOn ? 'On' : 'Off'}`;
    }
}
