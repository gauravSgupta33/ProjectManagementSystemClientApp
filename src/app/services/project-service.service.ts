import { ProjectVO } from '../model/Project';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) {}

  getProjects(): Observable<ProjectVO[]> {
    return this.http.get<ProjectVO[]>('http://localhost:9080' + '/projects');
  }

  addProject(project): Observable<ProjectVO> {
    return this.http.post<ProjectVO>('http://localhost:9080' + '/createProject', project);
  }
  
  updateProject(id, project): Observable<ProjectVO> {
    return this.http.put<ProjectVO>(`http://localhost:9080` + `/updateProject/${id}`, project);
  }
}