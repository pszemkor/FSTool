import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlgoType, FeatureSelectionParameters} from '../shared/featureselectionparameters';
import {FeatureSelectionResults} from '../shared/featureselectionresults';

@Component({
  selector: 'app-paramsform',
  templateUrl: './paramsform.component.html',
  styleUrls: ['./paramsform.component.scss']
})
export class ParamsformComponent implements OnInit {

  paramsForm: FormGroup;
  params: FeatureSelectionParameters;
  algoType = AlgoType;
  @Output() sendParams: EventEmitter<FeatureSelectionParameters> = new EventEmitter<FeatureSelectionParameters>();

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
      this.params = new FeatureSelectionParameters();
  }

  createForm() {
    this.paramsForm = this.fb.group({
      algoType: 'RF',
      rf: false,
      svm: false,
      nn: false,
      csvPath: '',
    });
  }

  onSubmit() {
    this.params = new FeatureSelectionParameters();
    this.params.algoType = this.paramsForm.value.algoType;
    this.params.rf = this.paramsForm.value.rf;
    this.params.svm = this.paramsForm.value.svm;
    this.params.nn = this.paramsForm.value.nn;

    console.log(this.params);
    this.sendParams.emit(this.params);
    this.paramsForm.reset({
      algoType: 'RF',
      rf: false,
      svm: false,
      nn: false,
      csvPath: '',
    });
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
