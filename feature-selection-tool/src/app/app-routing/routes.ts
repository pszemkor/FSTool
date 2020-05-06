import {Routes} from '@angular/router'

import { MainComponent } from '../main/main.component';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'main', component: MainComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];