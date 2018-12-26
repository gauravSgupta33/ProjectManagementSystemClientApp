import {UserVO} from '../model/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserVO[]> {
    return this.http.get<UserVO[]>('http://localhost:9080' + '/users');
  }

  addUser(user): Observable<UserVO> {
    return this.http.post<UserVO>('http://localhost:9080' + '/createUser', user);
  }

  removeUser(user):Observable<boolean> {
    return this.http.post<boolean>('http://localhost:9080/removeUser', user);
    //alert('deleted');
    //return;
  }

   editUser(id, user): Observable<UserVO> {
    return this.http.put<UserVO>(`http://localhost:9080` + `/editUser/${id}`, user);
  }
  
  addOrUpdateProjectDetailsForUser(user): Observable<UserVO> {
    return this.http.post<UserVO>(`http://localhost:9080` + `/addOrUpdateProjectDetailsForUser`, user);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body;
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
