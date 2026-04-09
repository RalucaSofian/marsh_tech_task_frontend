import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth-service';
import { UsersService } from './services/users-service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App implements OnInit {
    protected readonly title = signal('DeviceManagement');
    authService: AuthService = inject(AuthService);
    userService: UsersService = inject(UsersService);
    private router = inject(Router);

    ngOnInit(): void {
        if (this.authService.isUserLoggedIn()) {
            this.userService.fetchMyUserInfo();
        } else {
            this.router.navigate(['login']);
        }
    }
}
