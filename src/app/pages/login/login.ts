import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { UsersService } from '../../services/users-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogIn, LucideAngularModule } from 'lucide-angular';
import { Button, ButtonSize, ButtonVariant } from '../../components/ui/button/button';
import { RouterLink } from '@angular/router';
import { Input } from '../../components/ui/input/input';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, LucideAngularModule, Button, RouterLink, Input],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    readonly LogIn = LogIn;
    readonly ButtonVariant = ButtonVariant;
    readonly ButtonSize = ButtonSize;
    authService: AuthService = inject(AuthService);
    userService: UsersService = inject(UsersService);
    signInError = signal(false);

    signInForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });

    private async requestLogin() {
        if (!this.signInForm.value?.email || !this.signInForm.value?.password) {
            return;
        }

        const loginSuccess = await this.authService.login(
            this.signInForm.value?.email,
            this.signInForm.value?.password,
        );
        this.signInError.set(!loginSuccess);
    }

    async onSignInSubmit() {
        await this.requestLogin();
        if (this.signInError() === false) {
            await this.requestUserInfo();
        }
    }

    private async requestUserInfo() {
        await this.userService.fetchMyUserInfo();
    }
}
