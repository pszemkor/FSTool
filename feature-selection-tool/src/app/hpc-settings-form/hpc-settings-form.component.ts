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
    this.hpcSettings = new HPCSettings();
    this.createForm();
  }

  ngOnInit(): void {
    this.hpcSettingsService.getSettings()
      .subscribe(response => {
          this.hpcSettings = (response as HPCSettings);
          this.settingsForm.reset({
            user_name: this.hpcSettings.user_name,
            grant_id: this.hpcSettings.grant_id,
            host: this.hpcSettings.host,
            proxy_certificate: this.hpcSettings.proxy_certificate,
          });
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = error;
          this.tempSettings = null;
        });
  }

  createForm() {
    this.settingsForm = this.fb.group({
      user_name: this.hpcSettings.user_name,
      host: this.hpcSettings.host,
      proxy_certificate: this.hpcSettings.proxy_certificate,
      grant_id: this.hpcSettings.grant_id
    });
  }

  onSubmit() {
    this.tempSettings = new HPCSettings();
    this.tempSettings.user_name = this.settingsForm.value.user_name;
    this.tempSettings.grant_id = this.settingsForm.value.grant_id;
    this.tempSettings.host = this.settingsForm.value.host;
    this.tempSettings.proxy_certificate = this.settingsForm.value.proxy_certificate;

    this.hpcSettingsService.postSettings(this.tempSettings)
      .subscribe(response => {
          this.hpcSettings = (response as HPCSettings);
          this.settingsForm.reset({
              user_name: this.hpcSettings.user_name,
              grant_id: this.hpcSettings.grant_id,
              host: this.hpcSettings.host,
              proxy_certificate: this.hpcSettings.proxy_certificate,
            }
          );
          this.tempSettings = null;
          this.errorMessage = null;
        },
        error => {
          this.errorMessage = error;
          this.tempSettings = null;
        });
  }
}
