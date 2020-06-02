import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationresultComponent } from './classificationresult.component';

describe('ClassificationresultComponent', () => {
  let component: ClassificationresultComponent;
  let fixture: ComponentFixture<ClassificationresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
