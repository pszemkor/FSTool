import { Component, OnInit } from '@angular/core';
import { FeatureSelectionParameters } from '../shared/featureselectionparameters';
import { FeatureSelectionService } from '../services/feature-selection.service';
import { FeatureSelectionResults, TEST_RESULT } from '../shared/featureselectionresults';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  params: FeatureSelectionParameters;
  results: FeatureSelectionResults;
  constructor(private featureSelection: FeatureSelectionService) { }

  ngOnInit(): void {
  }

  onSubmit(params: FeatureSelectionParameters): void {
    this.params = params;
    this.results = null;
    this.featureSelection.postRequest(this.params).subscribe(response =>
      {this.results = response; this.params = null; });

  }


}
