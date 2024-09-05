import { TestBed } from '@angular/core/testing';

import { HeaderRoutingService } from './header-routing.service';

describe('HeaderRoutingService', () => {
  let service: HeaderRoutingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderRoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
