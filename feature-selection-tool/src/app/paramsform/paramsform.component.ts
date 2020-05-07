import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  result: FeatureSelectionResults;
  @Output() sendParams: EventEmitter <FeatureSelectionParameters> = new EventEmitter<FeatureSelectionParameters>();

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnInit(): void {
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
    this.params = this.paramsForm.value;
    console.log(this.params);
    this.sendParams.emit(this.params);
    this.paramsForm.reset({
      algoType: 'RF',
      rf: false,
      svm: false,
      nn: false,
      csvPath: ''
    });
  }
}
