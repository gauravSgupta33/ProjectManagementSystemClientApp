import { AppContext } from '../common/appcontext';
import { ParentTaskVO } from '../model/ParentTaskVO';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ParentTaskService {
  constructor(private http: HttpClient, private appContext: AppContext) {}

  getAllParentTasks(): Observable<ParentTaskVO[]> {
    return this.http.get<ParentTaskVO[]>(this.appContext.SERVER_URL + '/parentTasks');
  }

  addParentTask(parentTask): Observable<ParentTaskVO> {
    return this.http.post<ParentTaskVO>(this.appContext.SERVER_URL + '/createParentTask', parentTask);
  }

}
