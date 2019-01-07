import {DataHolder} from './common/DataHolder';
import {ParentTaskService} from './services/parent-task.service';
import {ProjectService} from './services/project-service.service';
import {TasksService} from './services/task.service';
import {UserService} from './services/user-service.service';
import {Component, NgModule, OnInit, Output, EventEmitter} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService} from 'ng4-loading-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: string;
  notification: string;
  showNotification: boolean;

  projectTitle = 'Project Management System';
  loading = true;
  constructor(private ng4LoadingSpinnerService: Ng4LoadingSpinnerService, public dataHolder: DataHolder, private userService: UserService, private projectService: ProjectService, private parentTaskService: ParentTaskService, private taskService: TasksService) {
    this.name = 'ProjectManagement';
    this.ng4LoadingSpinnerService.show();
    setTimeout(function() {
      this.ng4LoadingSpinnerService.hide();
      this.loading = false;
    }.bind(this), 4000);

    if (!this.dataHolder.isUserListLoaded()) {
      this.userService.getUsers().subscribe(data => {
        this.dataHolder.addAllUser(data);
      });
    }

    if (!this.dataHolder.isProjectListLoaded()) {
      this.projectService.getProjects().subscribe(data => {
        this.dataHolder.addAllProjects(data);
      });
    }

    if (!this.dataHolder.isParentTaskListLoaded()) {
      this.parentTaskService.getAllParentTasks().subscribe(data => {
        this.dataHolder.addAllParentTasks(data);
      });
    }

    this.taskService.getTaskAndCompletedCountGroupByProject().subscribe(data => {
      this.dataHolder.setProjectTaskCounterMapObject(data);
    });



    this.dataHolder.addTab('Add Project', '/AddProject');
    this.dataHolder.addTab('Add Task', '/AddTask');
    this.dataHolder.addTab('Add User', '/AddUser');
    this.dataHolder.addTab('View Task', '/ViewTask');
  }

  handleTab(text) {
    console.log(text);
    if (text === 'View Task') {
      this.dataHolder.setShowEditTab(false);
      this.dataHolder.removeTab('Edit Task');
    } else if (text == 'Edit Task') {
      this.dataHolder.setShowEditTab(false);
      this.dataHolder.removeTab('Edit Task');
    }
  }

  ngOnInit() {
  }
}
