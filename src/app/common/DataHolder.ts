/**
 * New typescript file
 */
import {ProjectVO} from '../model/Project';
import {UserVO} from '../model/User';
import {ParentTaskVO} from '../model/ParentTaskVO';
import * as cloneDeep from 'lodash.cloneDeep';
import {Task} from '../model/Task';
import {TaskCounterVO} from '../model/TaskCounterVO';

export class DataHolder {
  private userList: Array<UserVO> = [];
  private projectList: Array<ProjectVO> = [];
  private parentTaskList: Array<ParentTaskVO> = [];
  private userListLoaded = false;
  private projectListLoaded = false;
  private parentTaskListLoaded = false;
  private projectTaskMap = new Map<number, Task[]>();
  private userMap = new Map<number, UserVO>();
  private projectMap = new Map<number, ProjectVO>();
  private parentTaskMap = new Map<number, ParentTaskVO>();
  private projectTaskCountMap = new Map<number, TaskCounterVO>();

  public isProjectListLoaded() {
    return this.projectListLoaded;
  }

  public isParentTaskListLoaded() {
    return this.parentTaskListLoaded;
  }

  public isUserListLoaded() {
    return this.userListLoaded;
  }

  addUser(user) {
    this.userList.push(user);
    this.userMap.set(user.id, user);
  }

  addAllUser(users) {
    this.userList = cloneDeep(users);
    for (let i = 0; i < this.userList.length; i++) {
      this.userMap.set(this.userList[i].id, this.userList[i]);
    }
    this.userListLoaded = true;
  }

  getUserList(): Array<UserVO> {
    return Array.from(this.userMap.values());
  }

  getUser(index) {
    return this.userList[index];
  }

  isUserAlreadyExists(empId) {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].empId == empId) {
        return true;
      }

    }
    return false;
  }


  removeUser(user) {
    this.userMap.delete(user.id);
  }

  addProject(project) {
    this.projectMap.set(project.projectId, project);
  }

  getProjectList(): Array<ProjectVO> {
    return Array.from(this.projectMap.values());
  }

  removeProject(project) {
    const index = this.projectList.indexOf(project);
    this.projectList.splice(index, 1);
  }

  addAllProjects(projects) {
    this.projectList = cloneDeep(projects);
    for(let i = 0; i< projects.length;i ++) {
      this.projectMap.set(projects[i].projectId, projects[i]);
    }
    this.projectListLoaded = true;
  }

  addParentTask(parentTask) {
    this.parentTaskList.push(parentTask);
    this.parentTaskMap.set(parentTask.parent_ID, parentTask);
  }

  getParentTaskList(): Array<ParentTaskVO> {
    return Array.from(this.parentTaskMap.values());
  }

  addAllParentTasks(parentTasks) {
    this.parentTaskList = cloneDeep(parentTasks);
    for(let i = 0; i< parentTasks.length;i ++) {
      this.parentTaskMap.set(parentTasks[i].parent_ID, parentTasks[i]);
    }

    this.parentTaskListLoaded = true;
  }

  getParentTaskById(id) {
//    for (let i = 0; i < this.parentTaskList.length; i++) {
//      if (this.parentTaskList[i].parent_ID == id) {
//        return this.parentTaskList[i].parent_task;
//      }
//
//    }
    if(this.parentTaskMap.has(id)) {
      return this.parentTaskMap.get(id).parent_task;
    }
    return ' No Parent Task Assigned ';
  }

  addProjectTaskMap(projectId, task) {
    this.projectTaskMap.set(projectId, task);
  }

  getTaskByProjectId(projectId) {
    if (this.projectTaskMap.has(projectId)) {
      return this.projectTaskMap.get(projectId);
    }
    return null;
  }

  setProjectTaskCounterMapObject(map) {
    for (let i = 0; i < map.length; i++) {
      this.projectTaskCountMap.set(map[i].projectId, map[i]);
    }
    console.log(this.projectTaskCountMap);
  }

  getProjectTaskCouter(projectId) {
    if (this.projectTaskCountMap.has(projectId)) {
      return this.projectTaskCountMap.get(projectId);
    }
    return new TaskCounterVO();
  }
  addProjectTaskCount(projectId, taskCounterVO) {
    this.projectTaskCountMap.set(projectId, taskCounterVO);
  }

  addTaskCountToCountMap(projectId) {
    if (this.projectTaskCountMap.has(projectId) === true) {
      const taskCounterVO = this.projectTaskCountMap.get(projectId);
      taskCounterVO.taskCount = taskCounterVO.taskCount + 1;
      this.projectTaskCountMap.set(projectId, taskCounterVO);
    } else {
      const taskCounterVO = new TaskCounterVO();
      taskCounterVO.taskCount = 1;
      this.projectTaskCountMap.set(projectId, taskCounterVO);
    }
  }

  addCompletedTaskCountMap(projectId) {
    if (this.projectTaskCountMap.has(projectId) === true) {
      const taskCounterVO = this.projectTaskCountMap.get(projectId);
      taskCounterVO.completedCount = taskCounterVO.completedCount + 1;
      this.projectTaskCountMap.set(projectId, taskCounterVO);
    }
  }
}
