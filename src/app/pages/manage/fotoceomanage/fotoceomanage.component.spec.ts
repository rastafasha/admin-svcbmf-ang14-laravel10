import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoceomanageComponent } from './fotoceomanage.component';

describe('FotoceomanageComponent', () => {
  let component: FotoceomanageComponent;
  let fixture: ComponentFixture<FotoceomanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoceomanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoceomanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
