import { TestBed } from '@angular/core/testing';
import { MockUserService } from 'src/app/mock/mock-user-service';
import { UserService } from 'src/app/services/user.service';
import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
    let component: WelcomeComponent;
    let userService: UserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                WelcomeComponent,
                { provide: UserService, useClass: MockUserService },
            ],
        }).compileComponents();

        component = TestBed.inject(WelcomeComponent);
        userService = TestBed.inject(UserService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not have welcome message after construction', () => {
        expect(component.welcome).toBe('');
    });

    it('should welcome logged in user after Angular calls ngOnInit', () => {
        component.ngOnInit();
        expect(component.welcome).toContain(userService.user.name);
    });

    it('should ask user to log in if not logged in after ngOnInit', () => {
        userService.isLoggedIn = false;
        component.ngOnInit();
        expect(component.welcome).not.toContain(userService.user.name);
        expect(component.welcome).toContain('log in');
    });
});
