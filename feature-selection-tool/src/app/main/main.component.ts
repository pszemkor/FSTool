import {Component, OnInit} from '@angular/core';
import {FeatureSelectionParameters} from '../shared/featureselectionparameters';
import {FeatureSelectionService} from '../services/feature-selection.service';
import {FeatureSelectionResults} from '../shared/featureselectionresults';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  params: FeatureSelectionParameters;
  errorMessage: string;

  constructor(private featureSelectionService: FeatureSelectionService) {
  }

  ngOnInit(): void {
  }

  onSubmit(params: FeatureSelectionParameters): void {
    this.params = params;
    this.errorMessage = '';
    this.featureSelectionService.postRequest(this.params)
      .subscribe(() => {
          this.params = null;
        },
        error => {
          this.errorMessage = error;
          this.params = null;
        });
  }


}
