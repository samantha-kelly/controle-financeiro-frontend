import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ContasComponent } from './components/contas/contas.component';
import { canActivateGuard } from './routing/can-activate-guard.guard';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { LancamentosComponent } from './components/lancamentos/lancamentos.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'home',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: 'welcome', component: WelcomeComponent },
            { path: 'contas', component: ContasComponent },
            { path: 'categorias', component: CategoriasComponent },
            { path: 'lancamentos', component: LancamentosComponent },
        ],
        canActivate: [canActivateGuard],
    },

];
