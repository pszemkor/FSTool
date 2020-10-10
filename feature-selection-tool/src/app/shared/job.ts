export class Job{
    id: string;
    name: string;
    // creation_timestamp: Date;
    status: JobStatus;
}

export enum JobStatus{
  Running = 'RUNNING',
  Finished = 'FINISHED',
  Error = 'ERROR',
}
