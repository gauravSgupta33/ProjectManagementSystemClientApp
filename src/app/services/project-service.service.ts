import { AppContext } from '../common/appcontext';
import { ProjectVO } from '../model/Project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient, private appContext:AppContext) {}

  getProjects(): Observable<ProjectVO[]> {
    return this.http.get<ProjectVO[]>(this.appContext.SERVER_URL + '/projects');
  }

  addProject(project): Observable<ProjectVO> {
    return this.http.post<ProjectVO>(this.appContext.SERVER_URL + '/createProject', project);
  }
  
  updateProject(id, project): Observable<ProjectVO> {
    return this.http.put<ProjectVO>(this.appContext.SERVER_URL + `/updateProject/${id}`, project);
  }
}