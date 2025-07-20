import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Operators } from './operators';

describe('Operators', () => {
  let component: Operators;
  let fixture: ComponentFixture<Operators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Operators]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Operators);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
