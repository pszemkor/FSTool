import {Component, OnInit} from '@angular/core';
import {ClassificationMetrics, ClassifierReport, FeatureSelectionResults} from '../shared/featureselectionresults';
import {baseURL} from '../shared/baseurl';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  result: FeatureSelectionResults;
  columnsToDisplayFeatures = ['name', 'score'];
  columnsToDisplayClf = ['kind', 'f1-score', 'precision', 'recall', 'support'];
  baseUrl = baseURL;

  constructor() {
  }

  ngOnInit(): void {
    this.result = history.state.fsResult;
    this.parseFoldReports();
  }

  parseFoldReports(): void {
    for (const fReport of this.result.report.fold_reports) {
      fReport.classifier_reports = [];
      for (const key in fReport.reports){
        fReport.classifier_reports.push(this.parseJSONReport(key, fReport.reports[key]));
      }
    }
  }

  parseJSONReport(classifierName: string, jsonReport: any): ClassifierReport {
    const finalReport = new ClassifierReport();
    finalReport.classifier_name = classifierName;
    finalReport.accuracy = Math.round(jsonReport.accuracy * 100) / 100;
    delete jsonReport.accuracy;
    finalReport.macro_avg = this.parseMetrics('Macro average', jsonReport['macro avg']);
    delete jsonReport['macro avg'];
    finalReport.weighted_avg = this.parseMetrics('Weighted average', jsonReport['weighted avg']);
    delete jsonReport['weighted avg'];

    finalReport.class_metrics = [];
    for (const cat in jsonReport){
      finalReport.class_metrics.push(this.parseMetrics(cat, jsonReport[cat]));
      delete jsonReport[cat];
    }
    return finalReport;
  }

  parseMetrics(cat: string, jsonMetrics: any): ClassificationMetrics {
    let metrics = new ClassificationMetrics();
    metrics.f1_score = Math.round(jsonMetrics['f1-score'] * 100) / 100;
    metrics.precision = Math.round(jsonMetrics.precision * 100) / 100;
    metrics.recall = Math.round(jsonMetrics.recall * 100) / 100;
    metrics.support = Math.round(jsonMetrics.support * 100) / 100;
    metrics.kind = cat;
    return metrics;
  }

}
