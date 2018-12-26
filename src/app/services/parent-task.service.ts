import { ParentTaskVO } from '../model/ParentTaskVO';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ParentTaskService {
  constructor(private http: HttpClient) {}

  getAllParentTasks(): Observable<ParentTaskVO[]> {
    return this.http.get<ParentTaskVO[]>('http://localhost:9080' + '/parentTasks');
  }

  addParentTask(parentTask): Observable<ParentTaskVO> {
    return this.http.post<ParentTaskVO>('http://localhost:9080' + '/createParentTask', parentTask);
  }

}
