import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from 'src/app/model/hero';

@Component({
    selector: 'app-dashboard-hero',
    templateUrl: './dashboard-hero.component.html',
    styleUrls: ['./dashboard-hero.component.scss'],
})
export class DashboardHeroComponent {
    @Input() hero!: Hero;
    @Output() selected = new EventEmitter<Hero>();

    click(): void {
        this.selected.emit(this.hero);
    }
}
