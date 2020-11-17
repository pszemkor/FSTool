import {Routes} from '@angular/router';

import {MainComponent} from '../main/main.component';
import {HomeComponent} from '../home/home.component';
import {ModelsComponent} from '../models/models.component';
import {HPCSettingsComponent} from '../hpc-settings/hpc-settings.component';
import {JobsComponent} from '../jobs/jobs.component';
import {ResultsComponent} from '../results/results.component';
import {AlgorithmSelectionComponent} from '../algorithm-selection/algorithm-selection.component';
import {AlgoSettingsComponent} from '../algo-settings/algo-settings.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'main', component: MainComponent},
  {path: 'models', component: ModelsComponent},
  {path: 'hpc-settings', component: HPCSettingsComponent},
  {path: 'algo-settings', component: AlgoSettingsComponent},
  {path: 'jobs', component: JobsComponent},
  {path: 'jobs/result/:jobId', component: AlgorithmSelectionComponent},
  {path: 'jobs/result/:jobId/:algoType', component: ResultsComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
