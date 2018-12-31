import {ProjectVO} from '../../model/Project';
import {UserVO} from '../../model/User';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class ProjectServiceMock {
  counter = 0;
  projectMap = new Map<number, ProjectVO>();

  constructor() {
    for (let i = 1; i <= 4; i++) {
      const projectVO = new ProjectVO();

      const user1 = new UserVO();
      user1.id = i;
      user1.empId = 22330 + i;
      user1.firstName = 'First Name ' + i;
      user1.lastName = 'Last Name ' + i;


      projectVO.endDate = new Date();
      projectVO.startDate = new Date();
      projectVO.priority = i;
      projectVO.projectId = i;
      projectVO.projectName = "Project Name " + i;
      projectVO.user = user1;
      this.projectMap.set(projectVO.projectId, projectVO);
    }
    this.counter = 4;
  }

  getProjects(): Observable<ProjectVO[]> {
    // return this.http.get<ProjectVO[]>(this.appContext.SERVER_URL + '/projects');
    return Observable.of(Array.from(this.projectMap.values()));
  }

  addProject(project): Observable<ProjectVO> {
    // return this.http.post<ProjectVO>(this.appContext.SERVER_URL + '/createProject', project);
    project.projectId = this.counter + 1;
    this.counter = project.projectId;
    this.projectMap.set(project.projectId, project);
    return project;
  }

  updateProject(id, project): Observable<ProjectVO> {
    // return this.http.put<ProjectVO>(this.appContext.SERVER_URL + `/updateProject/${id}`, project);
    this.projectMap.set(project.projectId, project);
    return project;
  }
}
