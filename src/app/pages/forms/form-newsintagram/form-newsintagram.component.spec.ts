import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNewsintagramComponent } from './form-newsintagram.component';

describe('FormNewsintagramComponent', () => {
  let component: FormNewsintagramComponent;
  let fixture: ComponentFixture<FormNewsintagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewsintagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewsintagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
