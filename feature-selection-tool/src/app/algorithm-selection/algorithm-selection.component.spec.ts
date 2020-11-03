import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmSelectionComponent } from './algorithm-selection.component';

describe('AlgorithmSelectionComponent', () => {
  let component: AlgorithmSelectionComponent;
  let fixture: ComponentFixture<AlgorithmSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgorithmSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
