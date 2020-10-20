import {Routes} from '@angular/router';

import {MainComponent} from '../main/main.component';
import {HomeComponent} from '../home/home.component';
import {ModelsComponent} from '../models/models.component';
import {HPCSettingsComponent} from '../hpc-settings/hpc-settings.component';
import {JobsComponent} from '../jobs/jobs.component';
import {ResultsComponent} from '../results/results.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'main', component: MainComponent},
  {path: 'models', component: ModelsComponent},
  {path: 'hpc-settings', component: HPCSettingsComponent},
  {path: 'jobs', component: JobsComponent},
  {path: 'jobs/result/:jobId', component: ResultsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
