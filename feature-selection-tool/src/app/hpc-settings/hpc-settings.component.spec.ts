import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HPCSettingsComponent } from './hpc-settings.component';

describe('HPCSettingsComponent', () => {
  let component: HPCSettingsComponent;
  let fixture: ComponentFixture<HPCSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HPCSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HPCSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
