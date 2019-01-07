import {DataHolder} from '../../common/DataHolder';
import {ProjectVO} from '../../model/Project';
import {ParentTaskService} from '../../services/parent-task.service';
import {ProjectService} from '../../services/project-service.service';
import {TasksService} from '../../services/task.service';
import {UserService} from '../../services/user-service.service';
import {Component, OnInit} from '@angular/core';
import * as cloneDeep from 'lodash.cloneDeep';
import {Task} from '../../model/Task';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  showProjectModal = false;
  selectedProjectRow = -1;
  project = new ProjectVO();
  tempProject: ProjectVO;
  searchProject: string;
  tasks: Array<Task> = [];
  showData = false;
  complete = 1;
  sortTypeStatMap = new Map<String, number>();
  sortType: string;
  direction: number;
  showViewTask = true;
  taskToEdit: Task;

  constructor(private dataHolder: DataHolder,
    private projectService: ProjectService, private userService: UserService,
    private parentTaskService: ParentTaskService, private taskService: TasksService) {}

  ngOnInit() {
    this.sortTypeStatMap.set('startDate', 1);
    this.sortTypeStatMap.set('endDate', 1);
    this.sortTypeStatMap.set('priority', 1);
    this.sortTypeStatMap.set('status', 1);
    if (!this.dataHolder.isProjectListLoaded()) {
      this.projectService.getProjects().subscribe(data => {
        this.dataHolder.addAllProjects(data);
      });
    }
  }


  getViewClickStatus() {
    //alert(value);
    if (!this.showViewTask) {
      this.showViewTask = !this.dataHolder.showEditTab();
    }
    return this.showViewTask;
  }

  //Getting value from child
  childToParent(value) {
    this.taskToEdit = value.editedTask;

    this.taskService.getTasksByProjectId(value.editedTask.project.projectId).subscribe(data => {
      this.tasks = cloneDeep(data);
      if (this.tasks.length > 0) {
        this.showData = true;
        this.dataHolder.addProjectTaskMap(value.editedTask.project.projectId, data);
      }
    });
    this.showViewTask = true;//value.status;
  }

  loadTasksList() {
    this.showData = false;
    this.taskService.getTasksByProjectId(this.project.projectId).subscribe(data => {
      this.tasks = cloneDeep(data);
      if (this.tasks.length > 0) {
        this.showData = true;
        this.dataHolder.addProjectTaskMap(this.project.projectId, data);
      }
    });

  }


  markComplete(task) {
    this.taskService.updateTaskStatus(task.taskId, task, this.complete).subscribe(data => {
      task = data;
      let tasks1 = this.dataHolder.getTaskByProjectId(task.project.projectId);
      this.dataHolder.addCompletedTaskCountMap(data.project.projectId);

      for (var i = 0; i < tasks1.length; i++) {
        if (tasks1[i].taskId === task.taskId) {
          tasks1[i] = data;
        }
      }
    });
  }

  editTask(taskVal) {
    this.taskToEdit = taskVal;
    this.showViewTask = false;
    this.dataHolder.addTabWithStyle('Edit Task', '/EditTask', 'nav-link active');
    this.dataHolder.setShowEditTab(true);
    this.dataHolder.updateTabStyle('View Task', 'nav-link');
  }

  getParentTask(parentId) {
    if (parentId == 0) {
      return ' No Parent Task Assigned ';
    } else {
      return this.dataHolder.getParentTaskById(parentId);
    }
  }
  openProjectModal() {
    this.selectedProjectRow = -1;
    this.showProjectModal = true;
    this.searchProject = '';
    this.tempProject = null;
  }

  closeProjectModal() {
    if (this.tempProject != null) {
      this.project = this.tempProject;
      this.loadTasksList();
    }
    this.showProjectModal = false;
  }


  onSearchChange(event: any) {
    alert(event.target.value);
  }

  setDblClickedProjectRow(project) {
    if (project == null) {
      this.project = new ProjectVO();
    } else {
      this.project = project;
      this.loadTasksList();
    }

    this.showProjectModal = false;
  }

  setClickedProjectRow(project) {
    if (project == null) {
      this.project = new ProjectVO();
    } else {
      this.tempProject = project;
    }
  }

  sortTask(type1) {
    this.sortType = type1;
    this.direction = this.sortTypeStatMap.get(type1);
    this.sortTypeStatMap.set(type1, (this.direction * -1));
  }
}
