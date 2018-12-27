import { AppContext } from '../common/appcontext';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Task} from '../model/Task';
import { TaskCounterVO } from '../model/TaskCounterVO';

@Injectable()
export class TasksService {
  constructor(private http: HttpClient, private appContext: AppContext) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.appContext.SERVER_URL + '/Tasks');
  }


  getTasksByProjectId(projectId): Observable<Task[]> {
    return this.http.get<Task[]>(this.appContext.SERVER_URL + `/getTasksByProjectId/${projectId}`);
  }

  addTask(task): Observable<Task> {
    return this.http.post<Task>(this.appContext.SERVER_URL + '/createTask', task);
  }

  updateTaskStatus(taskId, task, status): Observable<Task> {
    task.status = status;
    return this.http.put<Task>(this.appContext.SERVER_URL + `/updateTaskStatus/${taskId}`, task);
  }

  updateTask(taskId, task): Observable<Task> {
    return this.http.put<Task>(this.appContext.SERVER_URL + `/updateTask/${taskId}`, task);
  }

  getTaskAndCompletedCountGroupByProject(): Observable<TaskCounterVO[]> {
    return this.http.get<TaskCounterVO[]>(this.appContext.SERVER_URL + '/getTaskAndCompletedCountGroupByProject');
  }


}
