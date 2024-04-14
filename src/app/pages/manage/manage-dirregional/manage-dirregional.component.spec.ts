import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDirregionalComponent } from './manage-dirregional.component';

describe('ManageDirregionalComponent', () => {
  let component: ManageDirregionalComponent;
  let fixture: ComponentFixture<ManageDirregionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDirregionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDirregionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
