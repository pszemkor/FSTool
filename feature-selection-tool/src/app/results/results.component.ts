import {Component, Input, OnInit} from '@angular/core';
import {FeatureSelectionResults} from '../shared/featureselectionresults';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() results: FeatureSelectionResults;
  columnsToDisplayFeatures = ['index', 'name', 'score'];
  columnsToDisplayClf = ['classifier', 'accuracy', 'f1', 'recall'];

  constructor() { }

  ngOnInit(): void {
  }

}


