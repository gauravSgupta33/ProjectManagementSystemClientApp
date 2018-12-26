import { CustomSortingPipe } from './common/CustomSortingPipe';
import { DataHolder } from './common/DataHolder';
import { PrjoectModalSearchFilterPipe } from './common/ProjectModelSerachFilterPipe';
import { ErrorMessage } from './common/errormessage';
import { UserFilterPipe } from './common/filterpipe';
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import {ProjectComponent} from './project/project.component';
import { ParentTaskService } from './services/parent-task.service';
import { ProjectService } from './services/project-service.service';
import { TasksService } from './services/task.service';
import { UserService } from './services/user-service.service';
import { EditComponent } from './task/edit/edit.component';
import {TaskComponent} from './task/task.component';
import {ViewComponent} from './task/view/view.component';
import {UserComponent} from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import {NgModule, ErrorHandler} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome/dist';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NouisliderModule } from 'ng2-nouislider';
import { NgDatepickerModule } from 'ng2-datepicker';


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

@NgModule({
  declarations: [EditComponent, UserComponent, TaskComponent, ProjectComponent, ViewComponent, UserFilterPipe, ViewComponent, CustomSortingPipe, PrjoectModalSearchFilterPipe],
  imports: [RouterModule.forRoot(routes), NgbModule.forRoot(), BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AngularFontAwesomeModule, NgbModule, NouisliderModule, DpDatePickerModule, NgDatepickerModule],
  exports: [RouterModule],
    providers: [DataHolder, ErrorMessage, UserService, ProjectService, ParentTaskService, GlobalErrorHandlerService, TasksService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
   ]
})
export class AppRoutingModule {}