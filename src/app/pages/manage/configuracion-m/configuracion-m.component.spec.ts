import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionMComponent } from './configuracion-m.component';

describe('ConfiguracionMComponent', () => {
  let component: ConfiguracionMComponent;
  let fixture: ComponentFixture<ConfiguracionMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguracionMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracionMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
