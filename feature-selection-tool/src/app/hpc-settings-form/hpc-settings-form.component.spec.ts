import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HPCSettingsFormComponent } from './hpc-settings-form.component';

describe('HPCSettingsFormComponent', () => {
  let component: HPCSettingsFormComponent;
  let fixture: ComponentFixture<HPCSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HPCSettingsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HPCSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
