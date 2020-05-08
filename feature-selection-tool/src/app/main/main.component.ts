import { Component, OnInit } from '@angular/core';
import { FeatureSelectionParameters } from '../shared/featureselectionparameters';
import { FeatureSelectionService } from '../services/feature-selection.service';
import { FeatureSelectionResults } from '../shared/featureselectionresults';

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

  updateParams(params: FeatureSelectionParameters): void {
    this.featureSelection.postRequest(this.params).subscribe(response => this.results = <FeatureSelectionResults>response);
    this.params = params;
  }


}
