import { TestBed, inject } from '@angular/core/testing';

import { DrawvoteCrudService } from './drawvote-crud.service';

describe('DrawvoteCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawvoteCrudService]
    });
  });

  it('should be created', inject([DrawvoteCrudService], (service: DrawvoteCrudService) => {
    expect(service).toBeTruthy();
  }));
});
