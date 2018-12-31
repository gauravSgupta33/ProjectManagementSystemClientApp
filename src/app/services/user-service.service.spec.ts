import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user-service.service';
import {UserServiceMock} from './mocks/user-service-mock';


describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide:UserService, useClass:UserServiceMock}]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
