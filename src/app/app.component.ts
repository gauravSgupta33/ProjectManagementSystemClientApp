import {DataHolder} from './common/DataHolder';
import {ParentTaskService} from './services/parent-task.service';
import {ProjectService} from './services/project-service.service';
import {TasksService} from './services/task.service';
import {UserService} from './services/user-service.service';
import {Component, NgModule, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name: string;
  notification: string;
  showNotification: boolean;

  constructor(private dataHolder: DataHolder, private userService: UserService, private projectService: ProjectService, private parentTaskService: ParentTaskService, private taskService: TasksService) {
    this.name = 'ProjectManagement';
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

  }

  ngOnInit() {
  }
}
