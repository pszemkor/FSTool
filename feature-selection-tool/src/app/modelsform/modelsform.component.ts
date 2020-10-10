import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Model } from '../shared/model';
import { FeatureSelectionParameters } from '../shared/featureselectionparameters';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ModelsService } from '../services/models.service';
import { ClassificationParams } from '../shared/classificationparams';
@Component({
  selector: 'app-modelsform',
  templateUrl: './modelsform.component.html',
  styleUrls: ['./modelsform.component.scss']
})
export class ModelsformComponent implements OnInit {
  paramsForm: FormGroup;
  params: ClassificationParams;
  models: Model[];
  errorMessage: string;
  @Output() sendParams: EventEmitter<ClassificationParams> = new EventEmitter<ClassificationParams>();

  constructor(private fb: FormBuilder, private modelService: ModelsService) {
    this.createForm();
    this.modelService.getAvailableModels()
      .subscribe(models => this.models = models['models'],
        error => { this.errorMessage = error; this.params = null; });
  }

  ngOnInit(): void {
    this.params = new ClassificationParams();
  }

  createForm() {
    this.paramsForm = this.fb.group({
      model: 'modelID',
      csvPath: '',
    });
  }

  onSubmit() {
    this.params.modelID = this.paramsForm.value.model.id;
    console.log(this.params);
    this.sendParams.emit(this.params);
    this.paramsForm.reset({
      model: 'modelID',
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
