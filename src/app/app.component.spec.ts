import {TestBed, async} from '@angular/core/testing';
import {APP_BASE_HREF} from '@angular/common';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
import { EditComponent } from './task/edit/edit.component';
import {TaskComponent} from './task/task.component';
import {ViewComponent} from './task/view/view.component';
import {UserComponent} from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome/dist';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NouisliderModule } from 'ng2-nouislider';
import { NgDatepickerModule } from 'ng2-datepicker';
import { CustomSortingPipe } from './common/CustomSortingPipe';
import { UserFilterPipe } from './common/filterpipe';
import { PrjoectModalSearchFilterPipe } from './common/ProjectModelSerachFilterPipe';
import {DataHolder} from './common/DataHolder';

import { ParentTaskModalSerachFilterPipe } from './common/ParentTaskModalSerachFilterPipe';
import {ParentTaskServiceMock } from './services/mocks/parenttask-service-mock';
import {TasksServiceMock} from './services/mocks/task-service-mock';
import { ParentTaskService } from './services/parent-task.service';
import { ProjectService } from './services/project-service.service';
import { TasksService } from './services/task.service';
import { UserService } from './services/user-service.service';
import {ProjectServiceMock} from './services/mocks/project-service-mock';
import {UserServiceMock} from './services/mocks/user-service-mock';




describe('AppComponent', () => {
  const routes: Routes = [
    {
      path: 'AddUser',
      component: UserComponent,
    },
    {
      path: 'AddProject',
      component: ProjectComponent,
    },
    {
      path: 'AddTask',
      component: TaskComponent,
    },
    {
      path: 'ViewTask',
      component: ViewComponent,
    },
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UserComponent,
        ProjectComponent,
        ViewComponent,
        EditComponent,
        TaskComponent,
        UserFilterPipe, 
        CustomSortingPipe,
        PrjoectModalSearchFilterPipe,
        ParentTaskModalSerachFilterPipe
      ],
      imports: [
        RouterModule.forRoot(routes), 
        NgbModule.forRoot(), 
        BrowserModule, 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientModule, 
        AngularFontAwesomeModule, 
        NgbModule, 
        NouisliderModule, 
        DpDatePickerModule, 
        NgDatepickerModule
      ],
      providers: [DataHolder, {provide: ParentTaskService, useClass:ParentTaskServiceMock }, {provide: TasksService, useClass: TasksServiceMock}, {provide: UserService, useClass: UserServiceMock}, {provide: ProjectService, useClass: ProjectServiceMock}, 
        {provide: APP_BASE_HREF, useValue: '/'}
        
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Project Management System'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.projectTitle).toEqual('Project Management System');
  }));

  it('should render projectTitle in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Project Management System');
  }));
});