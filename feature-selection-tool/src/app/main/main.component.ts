import { Component, OnInit } from '@angular/core';
import {FeatureSelectionParameters} from '../shared/featureselectionparameters';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  params: FeatureSelectionParameters;

  constructor() { }

  ngOnInit(): void {
  }

  updateParams(params: FeatureSelectionParameters): void{
    this.params = params;
  }

}
