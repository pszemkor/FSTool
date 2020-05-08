import {Component, OnInit} from '@angular/core';
import {FeatureSelectionParameters} from '../shared/featureselectionparameters';
import {FeatureSelectionResults, TEST_RESULT} from '../shared/featureselectionresults';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  params: FeatureSelectionParameters;
  results: FeatureSelectionResults;

  constructor() {
  }

  ngOnInit(): void {
  }

  updateParams(params: FeatureSelectionParameters): void {
    this.params = params;

    this.results = TEST_RESULT;
  }

}
