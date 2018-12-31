import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectComponent} from './project.component';
import {DataHolder} from '../common/DataHolder';
import {ErrorMessage} from '../common/errormessage';
import {ProjectVO} from '../model/Project';
import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../services/project-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ProjectServiceMock} from '../services/mocks/project-service-mock';
import {CustomSortingPipe} from '../common/CustomSortingPipe';
import {UserFilterPipe} from '../common/filterpipe';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome/dist';
import {DpDatePickerModule} from 'ng2-date-picker';
import {NouisliderModule} from 'ng2-nouislider';
import {NgDatepickerModule} from 'ng2-datepicker';
import {NgModule, ErrorHandler} from '@angular/core';
import { PrjoectModalSearchFilterPipe } from '../common/ProjectModelSerachFilterPipe';
import {UserServiceMock} from '../services/mocks/user-service-mock';
import {UserService} from '../services/user-service.service';
import { TasksService } from '../services/task.service';
import {TasksServiceMock} from '../services/mocks/task-service-mock';



describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let userFilter: UserFilterPipe;
  let SortBy: CustomSortingPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserFilterPipe, CustomSortingPipe, PrjoectModalSearchFilterPipe, ProjectComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule, AngularFontAwesomeModule,
        NgbModule,
        NouisliderModule,
        DpDatePickerModule,
        NgDatepickerModule
      ],
      providers: [DataHolder, ErrorMessage, {provide: ProjectService, useClass: ProjectServiceMock}, { provide: UserService, useClass: UserServiceMock}, {provide: TasksService, useClass: TasksServiceMock}
      ]
    })
      .compileComponents();
    this.userFilter = new UserFilterPipe();
    this.SortBy = new CustomSortingPipe();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
