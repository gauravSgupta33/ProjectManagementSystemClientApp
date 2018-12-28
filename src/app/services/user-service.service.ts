import { AppContext } from '../common/appcontext';
import {UserVO} from '../model/User';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private appContext: AppContext) {}

  getUsers(): Observable<UserVO[]> {
    return this.http.get<UserVO[]>(this.appContext.SERVER_URL + '/users');
  }

  addUser(user): Observable<UserVO> {
    return this.http.post<UserVO>(this.appContext.SERVER_URL + '/createUser', user);
  }

  removeUser(user):Observable<boolean> {
    return this.http.post<boolean>(this.appContext.SERVER_URL + '/removeUser', user);
  }

   editUser(id, user): Observable<UserVO> {
    return this.http.put<UserVO>(this.appContext.SERVER_URL + `/editUser/${id}`, user);
  }
  
  addOrUpdateProjectDetailsForUser(user): Observable<UserVO> {
    return this.http.post<UserVO>(this.appContext.SERVER_URL + `/addOrUpdateProjectDetailsForUser`, user);
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
