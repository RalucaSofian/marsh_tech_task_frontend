import { HttpStatusCode } from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loginURL = 'http://localhost:5047/auth/login';
    private signupURL = 'http://localhost:5047/auth/signup';

    private router = inject(Router);
    _isUserLoggedIn = signal(false);

    constructor() {
        if (this.getJWT()) {
            this._isUserLoggedIn.set(true);
        }
    }

    async login(email: string, password: string): Promise<boolean> {
        const loginInfo: any = {
            Email: email,
            Password: password,
        };

        const response = await fetch(this.loginURL, {
            method: 'post',
            body: JSON.stringify(loginInfo),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === HttpStatusCode.Ok) {
            const token = await response.text();
            this.setJWT(token);
            this._isUserLoggedIn.set(true);
            this.router.navigate(['']);
            return true;
        }

        return false;
    }

    async signup(
        name: string,
        email: string,
        password: string,
        confirmPassword: string,
        location: string,
    ): Promise<boolean> {
        const signupInfo: any = {
            Name: name,
            Email: email,
            Password: password,
            ConfirmPassword: confirmPassword,
            Location: location,
        };

        const response = await fetch(this.signupURL, {
            method: 'post',
            body: JSON.stringify(signupInfo),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === HttpStatusCode.Ok) {
            const token = await response.text();
            this.setJWT(token);
            this._isUserLoggedIn.set(true);
            this.router.navigate(['']);
            return true;
        }

        return false;
    }

    logout() {
        this.clearJWT();
        this._isUserLoggedIn.set(false);
        this.router.navigate(['/login']);
    }

    private setJWT(value: string) {
        localStorage.setItem('jwt', value);
    }

    getJWT(): string {
        const jwtVal = localStorage.getItem('jwt');
        return jwtVal ?? '';
    }

    clearJWT() {
        localStorage.removeItem('jwt');
    }

    get isUserLoggedIn(): Signal<boolean> {
        return this._isUserLoggedIn.asReadonly();
    }
}
