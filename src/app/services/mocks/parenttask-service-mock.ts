import { ParentTaskVO } from '../../model/ParentTaskVO';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ParentTaskServiceMock {
    parentTaskMap = new Map<number, ParentTaskVO>();

  constructor() {}

  getAllParentTasks(): Observable<ParentTaskVO[]> {
    return Observable.of(Array.from(this.parentTaskMap.values()));//this.http.get<ParentTaskVO[]>(this.appContext.SERVER_URL + '/parentTasks');
  }

  addParentTask(parentTask): Observable<ParentTaskVO> {
    return parentTask;//this.http.post<ParentTaskVO>(this.appContext.SERVER_URL + '/createParentTask', parentTask);
  }

}
