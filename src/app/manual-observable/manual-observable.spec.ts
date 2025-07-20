import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualObservable } from './manual-observable';

describe('ManualObservable', () => {
  let component: ManualObservable;
  let fixture: ComponentFixture<ManualObservable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualObservable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualObservable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
