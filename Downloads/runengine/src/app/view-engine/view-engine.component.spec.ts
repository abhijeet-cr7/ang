import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEngineComponent } from './view-engine.component';

describe('ViewEngineComponent', () => {
  let component: ViewEngineComponent;
  let fixture: ComponentFixture<ViewEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEngineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
