import { Component, OnInit, Input } from '@angular/core';
import { ClassificationResults } from '../shared/classificationresults';

@Component({
  selector: 'app-classificationresult',
  templateUrl: './classificationresult.component.html',
  styleUrls: ['./classificationresult.component.scss']
})
export class ClassificationresultComponent implements OnInit {
  @Input() results: ClassificationResults
  constructor() { }

  ngOnInit(): void {
  }

}
