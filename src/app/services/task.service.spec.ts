import { TestBed, inject } from '@angular/core/testing';

import { TasksService } from './task.service';
import {TasksServiceMock} from './mocks/task-service-mock';

describe('TasksService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: TasksService, useClass:TasksServiceMock}]
    });
  });

  it('should be created', inject([TasksService], (service: TasksService) => {
    expect(service).toBeTruthy();
  }));
});
