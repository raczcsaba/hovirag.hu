import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergetikaiComponent } from './energetikai.component';

describe('EnergetikaiComponent', () => {
  let component: EnergetikaiComponent;
  let fixture: ComponentFixture<EnergetikaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergetikaiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergetikaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
