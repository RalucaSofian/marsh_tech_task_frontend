import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { authenticationGuard } from './authentication-guard';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home | Device Management',
        canActivate: [authenticationGuard],
    },
    {
        path: 'login',
        component: Login,
        title: 'Login | Device Management',
    },
    {
        path: 'register',
        component: Register,
        title: 'Register | Device Management',
    }
];
