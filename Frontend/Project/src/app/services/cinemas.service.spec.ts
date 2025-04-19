import { TestBed } from '@angular/core/testing';

import { CinemasService } from './cinemas.service';

describe('CinemasService', () => {
  let service: CinemasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CinemasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
