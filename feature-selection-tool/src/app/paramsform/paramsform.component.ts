import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FeatureSelectionParameters} from '../shared/featureselectionparameters';

@Component({
  selector: 'app-paramsform',
  templateUrl: './paramsform.component.html',
  styleUrls: ['./paramsform.component.scss']
})
export class ParamsformComponent implements OnInit {

  @Output() sendParams: EventEmitter<FeatureSelectionParameters> = new EventEmitter<FeatureSelectionParameters>();
  paramsForm: FormGroup;
  metrics: string[] = ['f1-score', 'precision', 'recall'];
  params: FeatureSelectionParameters;
  defaultForm = {
    fs_rf: false,
    fs_it: false,
    fs_kendall: false,
    fs_pearson: false,
    fs_rmcsf: false,
    fs_skbest: false,
    fs_lasso: false,
    fs_elastic: false,
    rf: false,
    svm: false,
    nn: false,
    knn: false,
    hpc: false,
    k: 10,
    metric: 'f1-score',
    target: '',
    csvPath: '',
  };
  defaultMetric = 'f1-score';

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
    this.params = new FeatureSelectionParameters();
  }

  createForm() {
    this.paramsForm = this.fb.group(this.defaultForm);
  }

  onSubmit() {
    this.params.algorithms = this.getSelectedFSAlgorithms();
    this.params.classifiers = this.getSelectedClassifiers();
    this.params.target = this.paramsForm.value.target;
    this.params.hpc = this.paramsForm.value.hpc;
    this.params.k = this.paramsForm.value.k;
    this.params.metric = this.paramsForm.value.metric;

    console.log(this.params);
    this.sendParams.emit(this.params);
    this.paramsForm.reset(this.defaultForm);
  }

  private getSelectedFSAlgorithms() {
    const algorithmsMap: Map<string, boolean> = new Map<string, boolean>([
      ['rf', this.paramsForm.value.fs_rf],
      ['it', this.paramsForm.value.fs_it],
      ['skbest', this.paramsForm.value.fs_skbest],
      ['pearson', this.paramsForm.value.fs_pearson],
      ['rmcfs', this.paramsForm.value.fs_rmcsf],
      ['lasso', this.paramsForm.value.fs_lasso],
      ['elastic', this.paramsForm.value.fs_elastic],
      ['kendall', this.paramsForm.value.fs_kendall]]);
    const algorithms = [];
    for (const key of algorithmsMap.keys()) {
      if (algorithmsMap.get(key)) {
        algorithms.push(key);
      }
    }
    return algorithms;
  }

  private getSelectedClassifiers() {
    const classifiersMap: Map<string, boolean> = new Map<string, boolean>([
      ['rf', this.paramsForm.value.rf],
      ['svm', this.paramsForm.value.svm],
      ['knn', this.paramsForm.value.knn],
      ['nn', this.paramsForm.value.nn]]);
    const classifiers = [];
    for (const key of classifiersMap.keys()) {
      if (classifiersMap.get(key)) {
        classifiers.push(key);
      }
    }
    return classifiers;
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.params.csvBase64 = myReader.result;
    };

    myReader.readAsDataURL(file);
  }
}
