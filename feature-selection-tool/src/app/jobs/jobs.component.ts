import { Component, OnInit } from '@angular/core';
import {Job} from '../shared/job';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {JobsService} from '../services/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: Job[];
  columnsToDisplayJobs = ['id', 'name', 'status'];

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    interval(2000)
      .pipe(
        startWith(0),
        switchMap(() => this.jobsService.getAvailableJobs())
      )
      .subscribe(res => this.jobs = (res as Job[]));
  }

  onDelete(jobId: string): void{
    console.log('Will delete job ' + jobId);
    this.jobsService.deleteJob(jobId).subscribe(response => console.log(response));
  }

}
