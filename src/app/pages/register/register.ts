import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { UsersService } from '../../services/users-service';
import { LucideAngularModule, UserPlus } from 'lucide-angular';
import { Button, ButtonSize, ButtonVariant } from '../../components/ui/button/button';
import { RouterLink } from '@angular/router';
import { Input } from '../../components/ui/input/input';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule, LucideAngularModule, Button, RouterLink, Input],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class Register {
    readonly UserPlus = UserPlus;
    readonly ButtonVariant = ButtonVariant;
    readonly ButtonSize = ButtonSize;
    authService: AuthService = inject(AuthService);
    usersService: UsersService = inject(UsersService);
    signUpError = signal(false);

    signUpForm = new FormGroup({
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        location: new FormControl('', Validators.required),
    });

    private async requestSignUp() {
        if (
            !this.signUpForm.value?.name ||
            !this.signUpForm.value?.email ||
            !this.signUpForm.value?.password ||
            !this.signUpForm.value?.confirmPassword ||
            !this.signUpForm.value?.location
        ) {
            return;
        }

        const signupSuccess = await this.authService.signup(
            this.signUpForm.value?.name,
            this.signUpForm.value?.email,
            this.signUpForm.value?.password,
            this.signUpForm.value?.confirmPassword,
            this.signUpForm.value?.location,
        );
        this.signUpError.set(!signupSuccess);
    }

    async onSignUpSubmit() {
        await this.requestSignUp();
        if (this.signUpError() === false) {
            await this.requestUserInfo();
        }
    }

    private async requestUserInfo() {
        await this.usersService.fetchMyUserInfo();
    }
}
