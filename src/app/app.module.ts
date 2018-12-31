import { AppRoutingModule } from './app-routing.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DataHolder } from './common/DataHolder';
import { PrjoectModalSearchFilterPipe } from './common/ProjectModelSerachFilterPipe';
import { UserFilterPipe } from './common/filterpipe';
import { CustomSortingPipe } from './common/CustomSortingPipe';
import { NgbdModalContent } from './dialog/modal/modal-component';
import { UserComponent } from './user/user.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome/dist';
import { TaskComponent } from './task/task.component';
import { ProjectComponent } from './project/project.component';
import { ViewComponent } from './task/view/view.component';
import { NouisliderModule } from 'ng2-nouislider';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { ParentTaskService } from './services/parent-task.service';
import { ProjectService } from './services/project-service.service';
import { TasksService } from './services/task.service';
import { UserService } from './services/user-service.service';
import { RouterModule } from '@angular/router';
import { NgDatepickerModule } from 'ng2-datepicker';
import { EditComponent } from './task/edit/edit.component';
//import { ErrorDisplayComponent } from './error-display/error-display.component';


@NgModule({
  imports: [AppRoutingModule, BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, AngularFontAwesomeModule, NgbModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [DataHolder, UserService, ProjectService, ParentTaskService, GlobalErrorHandlerService, TasksService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }
   ]
})
export class AppModule {}
