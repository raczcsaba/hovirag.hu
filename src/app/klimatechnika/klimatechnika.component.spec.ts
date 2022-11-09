import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlimatechnikaComponent } from './klimatechnika.component';

describe('KlimatechnikaComponent', () => {
  let component: KlimatechnikaComponent;
  let fixture: ComponentFixture<KlimatechnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KlimatechnikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KlimatechnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
