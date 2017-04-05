import { TestBed, inject } from '@angular/core/testing';

import { PreviewBusService } from './preview-bus.service';

describe('PreviewBusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreviewBusService]
    });
  });

  it('should ...', inject([PreviewBusService], (service: PreviewBusService) => {
    expect(service).toBeTruthy();
  }));
});
