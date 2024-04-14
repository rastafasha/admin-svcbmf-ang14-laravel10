import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsintagramComponent } from './newsintagram.component';

describe('NewsintagramComponent', () => {
  let component: NewsintagramComponent;
  let fixture: ComponentFixture<NewsintagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsintagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsintagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
