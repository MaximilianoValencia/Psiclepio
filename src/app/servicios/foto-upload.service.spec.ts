import { TestBed } from '@angular/core/testing';

import { FotoUploadService } from './foto-upload.service';

describe('FotoUploadService', () => {
  let service: FotoUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FotoUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
