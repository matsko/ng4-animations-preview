import { TestBed, inject } from '@angular/core/testing';

import { ModalServiceService } from './modal-service.service';

describe('ModalServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalServiceService]
    });
  });

  it('should ...', inject([ModalServiceService], (service: ModalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
