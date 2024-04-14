import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsPacientesComponent } from './forms-pacientes.component';

describe('FormsPacientesComponent', () => {
  let component: FormsPacientesComponent;
  let fixture: ComponentFixture<FormsPacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
