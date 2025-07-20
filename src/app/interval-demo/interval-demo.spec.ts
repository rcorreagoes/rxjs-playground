import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalDemo } from './interval-demo';

describe('IntervalDemo', () => {
  let component: IntervalDemo;
  let fixture: ComponentFixture<IntervalDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntervalDemo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntervalDemo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
