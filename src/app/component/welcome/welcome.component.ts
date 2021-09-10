import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
    welcome = '';

    constructor(private _userService: UserService) {}

    ngOnInit(): void {
        this.welcome = this._userService.isLoggedIn
            ? `Welcome, ${this._userService.user.name}`
            : 'Please log in.';
    }
}
