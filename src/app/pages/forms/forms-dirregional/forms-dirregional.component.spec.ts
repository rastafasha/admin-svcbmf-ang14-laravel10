import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsDirregionalComponent } from './forms-dirregional.component';

describe('FormsDirregionalComponent', () => {
  let component: FormsDirregionalComponent;
  let fixture: ComponentFixture<FormsDirregionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsDirregionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsDirregionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
