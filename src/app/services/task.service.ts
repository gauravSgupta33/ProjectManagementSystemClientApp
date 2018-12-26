import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Task} from '../model/Task';
import { TaskCounterVO } from '../model/TaskCounterVO';

@Injectable()
export class TasksService {
  constructor(private http: HttpClient) {}

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:9080' + '/Tasks');
  }


  getTasksByProjectId(projectId): Observable<Task[]> {
    return this.http.get<Task[]>(`http://localhost:9080` + `/getTasksByProjectId/${projectId}`);
  }

  addTask(task): Observable<Task> {
    return this.http.post<Task>('http://localhost:9080' + '/createTask', task);
  }

  updateTaskStatus(taskId, task, status): Observable<Task> {
    task.status = status;
    return this.http.put<Task>(`http://localhost:9080` + `/updateTaskStatus/${taskId}`, task);
  }

  updateTask(taskId, task): Observable<Task> {
    return this.http.put<Task>(`http://localhost:9080` + `/updateTask/${taskId}`, task);
  }

  getTaskAndCompletedCountGroupByProject(): Observable<TaskCounterVO[]> {
    return this.http.get<TaskCounterVO[]>(`http://localhost:9080` + `/getTaskAndCompletedCountGroupByProject`);
  }


}
