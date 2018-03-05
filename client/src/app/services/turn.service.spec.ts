/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TurnService } from './turn.service';

describe('TurnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurnService]
    });
  });

  it('should ...', inject([TurnService], (service: TurnService) => {
    expect(service).toBeTruthy();
  }));
});
