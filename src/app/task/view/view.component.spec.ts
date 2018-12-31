import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewComponent } from './view.component';

import {DataHolder} from '../../common/DataHolder';
import {ErrorMessage} from '../../common/errormessage';
import {ParentTaskVO} from '../../model/ParentTaskVO';
import {Task} from '../../model/Task';
import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {NgbdModalContent} from '../../dialog/modal/modal-component';
import {ViewChild} from '@angular/core';
import {DatePickerComponent, IDayCalendarConfig, } from 'ng2-date-picker';
import {DatepickerOptions} from 'ng2-datepicker';
import {pipe} from 'rxjs';
import {ProjectVO} from '../../model/Project';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DateValidator} from '../../validator/DateValidator';
import { EditComponent } from '../edit/edit.component';


import {ParentTaskServiceMock } from '../../services/mocks/parenttask-service-mock';
import {TasksServiceMock} from '../../services/mocks/task-service-mock';
import { ParentTaskService } from '../../services/parent-task.service';
import { ProjectService } from '../../services/project-service.service';
import { TasksService } from '../../services/task.service';
import { UserService } from '../../services/user-service.service';
import {ProjectServiceMock} from '../../services/mocks/project-service-mock';
import {UserServiceMock} from '../../services/mocks/user-service-mock';


import {CustomSortingPipe} from '../../common/CustomSortingPipe';
import {UserFilterPipe} from '../../common/filterpipe';
import { ParentTaskModalSerachFilterPipe } from '../../common/ParentTaskModalSerachFilterPipe';
import { PrjoectModalSearchFilterPipe } from '../../common/ProjectModelSerachFilterPipe';

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let showViewTask = true;
  let taskToEdit: Task;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParentTaskModalSerachFilterPipe, UserFilterPipe, CustomSortingPipe, PrjoectModalSearchFilterPipe,  ViewComponent, EditComponent ],
            imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [DataHolder, ErrorMessage, {provide: ParentTaskService, useClass:ParentTaskServiceMock}, {provide: TasksService, useClass: TasksServiceMock}, {provide: UserService, useClass: UserServiceMock}, {provide: ProjectService, useClass: ProjectServiceMock}
      ]
    })
    .compileComponents();
    this.task = new Task();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
