import {Component, Input, OnInit} from '@angular/core';
import {FeatureSelectionResults} from '../shared/featureselectionresults';
import {JobsService} from '../services/jobs.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() results: FeatureSelectionResults;
  columnsToDisplayFeatures = ['index', 'name', 'score'];
  columnsToDisplayClf = ['classifier', 'accuracy', 'f1', 'recall'];

  constructor(private jobsService: JobsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.results == null) {
      this.route.paramMap.subscribe(m =>
        this.jobsService.getJobResult(m.get('jobId')).subscribe(res => {
          this.results = res;
        }));
    }
  }
}


