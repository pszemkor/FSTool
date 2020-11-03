import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {HttpClientModule} from '@angular/common/http';
import {MatListModule} from '@angular/material/list';
import {FeatureSelectionService} from './services/feature-selection.service';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import {HighlightDirective} from './directives/highlight.directive';
import {ParamsformComponent} from './paramsform/paramsform.component';

import {baseURL} from './shared/baseurl';
import {ResultsComponent} from './results/results.component';
import {MatTableModule} from '@angular/material/table';
import {ModelsComponent} from './models/models.component';
import {ModelsformComponent} from './modelsform/modelsform.component';
import {HPCSettingsComponent} from './hpc-settings/hpc-settings.component';
import {JobsComponent} from './jobs/jobs.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {HPCSettingsFormComponent} from './hpc-settings-form/hpc-settings-form.component';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    HeaderComponent,
    HighlightDirective,
    ParamsformComponent,
    ResultsComponent,
    ModelsComponent,
    ModelsformComponent,
    HPCSettingsComponent,
    JobsComponent,
    HPCSettingsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatIconModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatSelectModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatTableModule,
    MatListModule,
    MatGridListModule,
    MatInputModule
  ],
  providers: [FeatureSelectionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
