import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from 'src/app/model/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    heroes: Array<Hero> = [];

    constructor(private _router: Router, private _heroService: HeroService) {}

    ngOnInit() {
        this._heroService
            .getHeroes()
            .subscribe(
                (heroes: Array<Hero>) => (this.heroes = heroes.slice(1, 5))
            );
    }

    gotoDetail(hero: Hero) {
        const url = `/heroes/${hero.id}`;
        this._router.navigateByUrl(url);
    }

    get title() {
        const cnt = this.heroes.length;
        return cnt === 0
            ? 'No Heroes'
            : cnt === 1
            ? 'Top Hero'
            : `Top ${cnt} Heroes`;
    }
}
