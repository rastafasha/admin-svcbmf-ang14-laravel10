import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeomanageComponent } from './ceomanage.component';

describe('CeomanageComponent', () => {
  let component: CeomanageComponent;
  let fixture: ComponentFixture<CeomanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeomanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeomanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
