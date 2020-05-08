import { Component, OnInit } from '@angular/core';
import { FeatureSelectionParameters } from '../shared/featureselectionparameters';
import { FeatureSelectionService } from '../services/feature-selection.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  params: FeatureSelectionParameters;

  constructor(private featureSelection: FeatureSelectionService) { }

  ngOnInit(): void {
  }

  updateParams(params: FeatureSelectionParameters): void {
    this.featureSelection.postRequest(this.params).subscribe(response => console.log(response));
    this.params = params;
  }


}
