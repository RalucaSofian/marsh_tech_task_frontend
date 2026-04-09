import { inject, Injectable, signal } from '@angular/core';
import { HttpService } from './http-service';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private http = inject(HttpService);
    private readonly _users = signal<User[]>([]);
    readonly users = this._users.asReadonly();
    private readonly _crtUserSignal = signal<User>({});
    readonly currentUser = this._crtUserSignal.asReadonly();

    async fetchUsers() {
        this.http.get<User[]>('users').subscribe({
            next: (value) => {
                this._users.set(value);
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => {
                console.log('Fetch completed');
            },
        });
    }

    async fetchMyUserInfo() {
        this.http.get<User>('users/me').subscribe({
            next: (value) => {
                this._crtUserSignal.set(value);
            },
            error: (err) => {
                console.log(err);
            },
            complete: () => { console.log('Fetch completed'); }
        });
    }
}
