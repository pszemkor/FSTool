import { Component, OnInit } from '@angular/core';
import { ClassificationParams } from '../shared/classificationparams';
import { ModelsService } from '../services/models.service';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  params: ClassificationParams;
  results: ClassificationParams;
  errorMessage: String;

  constructor(private modelService: ModelsService) { }

  ngOnInit(): void {
  }

  onSubmit(params: ClassificationParams): void {
    this.params = params;
    this.results = null;
    this.modelService.postRequest(this.params)
      .subscribe(response => { this.results = response; this.params = null; },
        error => {this.errorMessage = error; this.params = null;});
  }
}
