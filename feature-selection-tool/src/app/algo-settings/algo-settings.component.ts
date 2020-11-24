import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlgoSettingsService} from '../services/algo-settings.service';
import {ClassifierSettings, SelectorSettings} from '../shared/algosettings';

@Component({
  selector: 'app-algo-settings',
  templateUrl: './algo-settings.component.html',
  styleUrls: ['./algo-settings.component.scss']
})
export class AlgoSettingsComponent implements OnInit {

  selectorSettingsForm: FormGroup;
  classifierSettingsForm: FormGroup;

  selectorSettings: SelectorSettings;
  classifierSettings: ClassifierSettings;
  tempSelectorSettings: SelectorSettings;
  tempClassifierSettings: ClassifierSettings;

  selectorErrorMessage: string;
  classifierErrorMessage: string;

  constructor(private fb: FormBuilder, private algoSettingsService: AlgoSettingsService) {
    this.selectorSettings = new SelectorSettings();
    this.classifierSettings = new ClassifierSettings();
    this.createForm();
  }

  ngOnInit(): void {
    this.algoSettingsService.getSelectorSettings()
      .subscribe(response => {
          this.selectorSettings = (response as SelectorSettings);
          this.selectorSettingsForm.reset({
            rf_n_estimators: this.selectorSettings.rf_n_estimators,
            it_iterations: this.selectorSettings.it_iterations,
            it_case: this.selectorSettings.it_case,
            it_control: this.selectorSettings.it_control,
            it_subset_size: this.selectorSettings.it_subset_size,
            it_alpha: this.selectorSettings.it_alpha,
            rmcfs_cutoff_permutations: this.selectorSettings.rmcfs_cutoff_permutations,
            correlation_threshold: this.selectorSettings.correlation_threshold,
          });
          this.selectorErrorMessage = null;
        },
        error => {
          this.selectorErrorMessage = error;
          this.tempSelectorSettings = null;
        });
    this.algoSettingsService.getClassifierSettings()
      .subscribe(response => {
          this.classifierSettings = (response as ClassifierSettings);
          this.classifierSettingsForm.reset({
            rf_n_estimators: this.classifierSettings.rf_n_estimators,
            knn_neighbours: this.classifierSettings.knn_neighbours,
            svm_c: this.classifierSettings.svm_c,
            mlp_nodes: this.classifierSettings.mlp_nodes,
          });
          this.classifierErrorMessage = null;
        },
        error => {
          this.classifierErrorMessage = error;
          this.tempClassifierSettings = null;
        });
  }

  createForm() {
    this.selectorSettingsForm = this.fb.group({
      rf_n_estimators: this.selectorSettings.rf_n_estimators,
      it_iterations: this.selectorSettings.it_iterations,
      it_case: this.selectorSettings.it_case,
      it_control: this.selectorSettings.it_control,
      it_subset_size: this.selectorSettings.it_subset_size,
      it_alpha: 0.5,
      rmcfs_cutoff_permutations: this.selectorSettings.rmcfs_cutoff_permutations,
      correlation_threshold: this.selectorSettings.correlation_threshold,
    });

    this.classifierSettingsForm = this.fb.group({
      rf_n_estimators: this.classifierSettings.rf_n_estimators,
      knn_neighbours: 3,
      svm_c: this.classifierSettings.svm_c,
      mlp_nodes: this.classifierSettings.mlp_nodes,
    });
  }

  onSelectorSubmit() {
    this.tempSelectorSettings = new SelectorSettings();
    this.tempSelectorSettings.rf_n_estimators = this.selectorSettingsForm.value.rf_n_estimators;
    this.tempSelectorSettings.it_iterations = this.selectorSettingsForm.value.it_iterations;
    this.tempSelectorSettings.it_case = this.selectorSettingsForm.value.it_case;
    this.tempSelectorSettings.it_control = this.selectorSettingsForm.value.it_control;
    this.tempSelectorSettings.it_subset_size = this.selectorSettingsForm.value.it_subset_size;
    this.tempSelectorSettings.it_alpha = this.selectorSettingsForm.value.it_alpha;
    this.tempSelectorSettings.rmcfs_cutoff_permutations = this.selectorSettingsForm.value.rmcfs_cutoff_permutations;
    this.tempSelectorSettings.correlation_threshold = this.selectorSettingsForm.value.correlation_threshold;

    this.algoSettingsService.postSelectorSettings(this.tempSelectorSettings)
      .subscribe(response => {
          this.selectorSettings = (response as SelectorSettings);
          this.selectorSettingsForm.reset({
              rf_n_estimators: this.selectorSettings.rf_n_estimators,
              it_iterations: this.selectorSettings.it_iterations,
              it_case: this.selectorSettings.it_case,
              it_control: this.selectorSettings.it_control,
              it_subset_size: this.selectorSettings.it_subset_size,
              it_alpha: this.selectorSettings.it_alpha,
              rmcfs_cutoff_permutations: this.selectorSettings.rmcfs_cutoff_permutations,
              correlation_threshold: this.selectorSettings.correlation_threshold,
            }
          );
          this.tempSelectorSettings = null;
          this.selectorErrorMessage = null;
        },
        error => {
          this.selectorErrorMessage = error;
          this.tempSelectorSettings = null;
        });
  }

  onClassifierSubmit() {
    this.tempClassifierSettings = new ClassifierSettings();
    this.tempClassifierSettings.rf_n_estimators = this.classifierSettingsForm.value.rf_n_estimators;
    this.tempClassifierSettings.knn_neighbours = this.classifierSettingsForm.value.knn_neighbours;
    this.tempClassifierSettings.svm_c = this.classifierSettingsForm.value.svm_c;
    this.tempClassifierSettings.mlp_nodes = this.classifierSettingsForm.value.mlp_nodes;

    this.algoSettingsService.postClassifierSettings(this.tempClassifierSettings)
      .subscribe(response => {
          this.classifierSettings = (response as ClassifierSettings);
          this.classifierSettingsForm.reset({
              rf_n_estimators: this.classifierSettings.rf_n_estimators,
              knn_neighbours: this.classifierSettings.knn_neighbours,
              svm_c: this.classifierSettings.svm_c,
              mlp_nodes: this.classifierSettings.mlp_nodes,
            }
          );
          this.classifierErrorMessage = null;
          this.tempClassifierSettings = null;
        },
        error => {
          this.classifierErrorMessage = error;
          this.tempClassifierSettings = null;
        });
  }

}
