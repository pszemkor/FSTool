import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoSettingsComponent } from './algo-settings.component';

describe('AlgoSettingsComponent', () => {
  let component: AlgoSettingsComponent;
  let fixture: ComponentFixture<AlgoSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgoSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
