import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsformComponent } from './modelsform.component';

describe('ModelsformComponent', () => {
  let component: ModelsformComponent;
  let fixture: ComponentFixture<ModelsformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
