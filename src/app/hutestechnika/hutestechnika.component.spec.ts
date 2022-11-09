import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HutestechnikaComponent } from './hutestechnika.component';

describe('HutestechnikaComponent', () => {
  let component: HutestechnikaComponent;
  let fixture: ComponentFixture<HutestechnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HutestechnikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HutestechnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
