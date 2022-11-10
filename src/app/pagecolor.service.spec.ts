import { TestBed } from '@angular/core/testing';

import { PagecolorService } from './pagecolor.service';

describe('PagecolorService', () => {
  let service: PagecolorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagecolorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
