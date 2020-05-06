import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsformComponent } from './paramsform.component';

describe('ParamsformComponent', () => {
  let component: ParamsformComponent;
  let fixture: ComponentFixture<ParamsformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamsformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
