import {DataHolder} from '../common/DataHolder';
import { ErrorMessage } from '../common/errormessage';
import {UserVO} from '../model/User';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
//  firstName: string;
//  lastName: string;
//  empId: number;
  search: string;
  addOrUpdateButton = 'Add User';
  user = new UserVO();
  map = new Map<string, number>();
  sortType: string;
  direction: number;
  userForm: FormGroup;


  constructor(private fb: FormBuilder, private dataHolder: DataHolder, private userService: UserService, private errorMessage: ErrorMessage) {
    if (!this.dataHolder.isUserListLoaded()) {
      this.userService.getUsers().subscribe(data => {
        this.dataHolder.addAllUser(data);
      });
    }
    this.map.set('empId', 1);
    this.map.set('firstName', 1);
    this.map.set('lastName', 1);

    this.userForm = fb.group({
      'firstName': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(45)])],
      'lastName': [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(45)])],
      'empId': [null, Validators.compose([Validators.required, this.validateNumber.bind(this)])],
    });

  }

  validateNumber(control: FormControl): {[s: string]: boolean} {
    if (control.value === null) return {'NaN': true};
    if (control.value.length < 1 || control.value.length > 6) {
      return {'NaN': true};
    }
    // check to see if the control value is no a number
    if (isNaN(control.value)) {
      return {'NaN': true};
    }

    return null;
  }

  ngOnInit() {
  }


  resetVals() {
    this.addOrUpdateButton = 'Add User';
    this.userForm.controls['firstName'].patchValue('');
    this.userForm.controls['lastName'].patchValue('');
    this.userForm.controls['empId'].patchValue('');
    this.user = null;
  }

  addUser(formUser) {

    const tempUser = new UserVO();
    tempUser.firstName = formUser.firstName;
    tempUser.lastName = formUser.lastName;
    tempUser.empId = formUser.empId;

    if (this.addOrUpdateButton === 'Update User') {
      console.log(formUser);
      tempUser.id = this.user.id;
//      for (let i = 0; i < this.dataHolder.getUserList().length; i++) {
//        if (this.dataHolder.getUserList()[i].id === tempUser.id) {
//          continue;
//        } else if (this.dataHolder.getUserList()[i].empId === tempUser.empId) {
//          alert('Employee Id is already exists. Cannot edit user with same employee id');
//          return;
//        }
//      }
      this.userService.editUser(tempUser.id, tempUser).subscribe(data => {
        this.dataHolder.addUser(data);
        this.user = null;
        alert('User edit successful');
        this.resetVals();
      });
    } else {
//      if (this.dataHolder.isUserAlreadyExists(tempUser.empId)) {
//        alert('Employee Id is already exists. Cannot add user with same employee id');
//        return;
//      }
      this.userService.addUser(tempUser).subscribe(data => {
        console.log(data);
        this.resetVals();
        this.dataHolder.addUser(data);
      });
    }
  }


  editUser(user1) {
    this.userForm.controls['firstName'].patchValue(user1.firstName);
    this.userForm.controls['lastName'].patchValue(user1.lastName);
    this.userForm.controls['empId'].patchValue(user1.empId);
    this.user = user1;
    this.addOrUpdateButton = 'Update User';
  }

  removeUser(user) {
    this.userService.removeUser(user).subscribe(data => {
      console.log(data);
      this.dataHolder.removeUser(user);
    });
  }


  sortUser(type1) {
    this.sortType = type1;
    this.direction = this.map.get(type1);
    this.map.set(type1, (this.direction * -1));
  }
}
