export class Job{
    job_id: string;
    start_time: string;
    // creation_timestamp: Date;
    status: JobStatus;
}

export enum JobStatus{
  Queued= 'QUEUED',
  Running = 'RUNNING',
  Finished = 'FINISHED',
  Error = 'ERROR',
}
