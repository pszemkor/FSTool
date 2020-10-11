import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HPCSettingsService} from '../services/hpc-settings.service';
import {HPCSettings} from '../shared/hpcsettings';

@Component({
  selector: 'app-hpc-settings-form',
  templateUrl: './hpc-settings-form.component.html',
  styleUrls: ['./hpc-settings-form.component.scss']
})
export class HPCSettingsFormComponent implements OnInit {

  settingsForm: FormGroup;
  hpcSettings: HPCSettings;
  tempSettings: HPCSettings;
  errorMessage: string;

  constructor(private fb: FormBuilder, private hpcSettingsService: HPCSettingsService) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.hpcSettingsService.getSettings()
      .subscribe(response => {
          this.hpcSettings = (response as HPCSettings);
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = error;
          this.tempSettings = null;
        });
    this.settingsForm = this.fb.group({
      username: this.hpcSettings.username,
      grantId: this.hpcSettings.grantId,
      host: this.hpcSettings.host,
      proxyBase64String: this.hpcSettings.proxyBase64String,
    });
  }

  onSubmit() {
    this.tempSettings = new HPCSettings();
    this.tempSettings.username = this.settingsForm.value.username;
    this.tempSettings.grantId = this.settingsForm.value.grantId;
    this.tempSettings.host = this.settingsForm.value.host;
    this.tempSettings.proxyBase64String = this.settingsForm.value.proxyBase64String;

    this.hpcSettingsService.postSettings(this.tempSettings)
      .subscribe(response => {
          this.hpcSettings = (response as HPCSettings);
          this.tempSettings = null;
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = error;
          this.tempSettings = null;
        });

    this.settingsForm.reset({
        username: this.hpcSettings.username,
        grantId: this.hpcSettings.grantId,
        host: this.hpcSettings.host,
        proxyBase64String: this.hpcSettings.proxyBase64String,
      }
    );
  }

}
