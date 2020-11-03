import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JobResult} from '../shared/featureselectionresults';
import {JobsService} from '../services/jobs.service';

@Component({
  selector: 'app-algorithm-selection',
  templateUrl: './algorithm-selection.component.html',
  styleUrls: ['./algorithm-selection.component.scss']
})
export class AlgorithmSelectionComponent implements OnInit {

  jobResult: JobResult;
  jobId: string;

  constructor(private jobsService: JobsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.jobResult == null) {
      this.jobResult = new JobResult();
      this.route.paramMap.subscribe(m => {
          this.jobId = m.get('jobId');
          this.jobsService.getJobResult(m.get('jobId')).subscribe(res => {
            console.log(res);
            this.jobResult.selectorsResults = res;
          });
        }
      );
    }
  }
}
