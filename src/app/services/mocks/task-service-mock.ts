import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Task} from '../../model/Task';
import { TaskCounterVO } from '../../model/TaskCounterVO';

@Injectable()
export class TasksServiceMock {
  taskMap = new Map<number, Task>();
    taskCounterMap = new Map<number, TaskCounterVO>();

  constructor() {}

  getAllTasks(): Observable<Task[]> {
    return Observable.of(Array.from(this.taskMap.values()));
  }


  getTasksByProjectId(projectId): Observable<Task[]> {
    return Observable.of(Array.from(this.taskMap.values()));
  }

  addTask(task): Observable<Task> {
    return task;//this.http.post<Task>(this.appContext.SERVER_URL + '/createTask', task);
  }

  updateTaskStatus(taskId, task, status): Observable<Task> {
    task.status = status;
    return task;//this.http.put<Task>(this.appContext.SERVER_URL + `/updateTaskStatus/${taskId}`, task);
  }

  updateTask(taskId, task): Observable<Task> {
    return task;//this.http.put<Task>(this.appContext.SERVER_URL + `/updateTask/${taskId}`, task);
  }

  getTaskAndCompletedCountGroupByProject(): Observable<TaskCounterVO[]> {
    return Observable.of(Array.from(this.taskCounterMap.values()));
  }


}
