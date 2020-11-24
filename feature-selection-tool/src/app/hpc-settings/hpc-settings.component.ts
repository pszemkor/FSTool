import {Component, OnInit} from '@angular/core';
import {HPCSettingsService} from '../services/hpc-settings.service';
import {ErrorMessageProcessorService} from '../services/error-message-processor.service';

@Component({
  selector: 'app-hpc-settings',
  templateUrl: './hpc-settings.component.html',
  styleUrls: ['./hpc-settings.component.scss']
})
export class HPCSettingsComponent implements OnInit {
  setUpStatus: string;
  errorMessage: any;

  constructor(private hpcSettingsService: HPCSettingsService, private errorProcessor: ErrorMessageProcessorService) {
  }

  ngOnInit(): void {
  }

  setupEnvironment() {
    this.hpcSettingsService.sendSetupRequest().subscribe(_ => {
      this.setUpStatus = 'OK';
      this.errorMessage = null;
    }, error => {
      this.errorProcessor.handleError(error);
      this.setUpStatus = 'FAILURE';
      this.errorMessage = error;
    });
  }
}
