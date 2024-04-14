import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoceoComponent } from './fotoceo.component';

describe('FotoceoComponent', () => {
  let component: FotoceoComponent;
  let fixture: ComponentFixture<FotoceoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoceoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoceoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
