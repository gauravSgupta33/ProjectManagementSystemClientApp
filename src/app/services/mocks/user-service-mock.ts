/**
 * New typescript file
 */
import {UserVO} from '../../model/User';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class UserServiceMock {
  counter = 0;
  userMap = new Map<number, UserVO>();

  constructor() {
    for (let i = 1; i <= 4; i++) {
      const user1 = new UserVO();
      user1.id = i;
      user1.empId = 22330 + i;
      user1.firstName = 'First Name ' + i;
      user1.lastName = 'Last Name ' + i;
      this.userMap.set(user1.id, user1);
    }
    this.counter = 4;
  }

  getUsers(): Observable<UserVO[]> {
    return Observable.of(Array.from(this.userMap.values()));
  }

  addUser(user): Observable<UserVO> {
    this.counter = this.counter + 1;
    user.id = this.counter;
    this.userMap.set(user.id, user);
    return user;
  }

  removeUser(user): Observable<boolean> {
    return Observable.of(true);//this.userMap.delete(user.id);
  }

  editUser(id, user): Observable<UserVO> {
    this.userMap.set(id, user);
    return user;
  }

  addOrUpdateProjectDetailsForUser(user): UserVO {
    return user;
  }
}
