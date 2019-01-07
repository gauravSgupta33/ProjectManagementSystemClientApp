import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserComponent} from './user.component';
import {DataHolder} from '../common/DataHolder';
import {ErrorMessage} from '../common/errormessage';
import {UserVO} from '../model/User';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {UserServiceMock} from '../services/mocks/user-service-mock';
import {CustomSortingPipe} from '../common/CustomSortingPipe';
import {UserFilterPipe} from '../common/filterpipe';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userFilter: UserFilterPipe;
  let SortBy: CustomSortingPipe;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserFilterPipe, CustomSortingPipe, UserComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [DataHolder, ErrorMessage, {provide: UserService, useClass: UserServiceMock}
      ]
    })
      .compileComponents();
    this.userFilter = new UserFilterPipe();
    this.SortBy = new CustomSortingPipe();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`html should render one user with first name`, async(() => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelectorAll('tr');
    let tdFirstNameContent = el[0].children[0].children[0].children[0].children[0].children[0].innerHTML;

    expect(tdFirstNameContent).toContain('First Name 1');
  }));

  it(`html should render one user with last name`, async(() => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelectorAll('tr');
    let tdLastNameContent = el[0].children[0].children[0].children[0].children[0].children[1].innerHTML;;
    expect(tdLastNameContent).toContain('Last Name 1');
  }));


  it(`html should render one user with employee ID`, async(() => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelectorAll('tr');
    let tdEmpIdContent = el[0].children[0].children[0].children[0].children[0].children[2].innerHTML;
    expect(tdEmpIdContent).toContain('22331');
  }));


  
  it(`html should render Edit button on user data`, async(() => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelectorAll('tr');

    let tdEditButtonContent = el[1].children[0].innerHTML;

    expect(tdEditButtonContent).toContain('Edit');
  }));

  it(`html should render Remove button on user data`, async(() => {
    fixture.detectChanges();
    
    const el = fixture.nativeElement.querySelectorAll('tr');
    let tdRemoveButtonContent = el[2].children[0].innerHTML;
    expect(tdRemoveButtonContent).toContain('Remove');
  }));

  it(`html should add user`, async(() => {
    let submitEl: DebugElement;
    let user: any;

    //submitEl = fixture.debugElement.query(By.css('input[id=userFormSubmitButton]'));

    fixture.componentInstance.userForm.controls['firstName'].patchValue('Gaurav');
    fixture.componentInstance.userForm.controls['lastName'].patchValue('Gupta');
    fixture.componentInstance.userForm.controls['empId'].patchValue(223306);
    fixture.componentInstance.addOrUpdateButton = "Add User";
    fixture.componentInstance.addUser(fixture.componentInstance.userForm.value);

    fixture.detectChanges();
    const firstNameIn = fixture.debugElement.queryAll(By.css('div[id=userListFirstNameDiv_4]'))[0].nativeElement;
    const lastNameIn = fixture.debugElement.queryAll(By.css('div[id=userListLastNameDiv_4]'))[0].nativeElement;
    const empIdIn = fixture.debugElement.queryAll(By.css('div[id=userListEmpIdDiv_4]'))[0].nativeElement;

   // firstNameIn.properties
      //const firstName: HTMLElement = firstNameIn.nativeElement;
      //console.log("valiue is " + firstNameIn.innerHTML);

   expect(firstNameIn.innerHTML).toContain("Gaurav");
   expect(lastNameIn.innerHTML).toContain("Gupta");
   expect(empIdIn.innerHTML).toContain("223306");

//    expect(user.lastName).toBe("Gupta");
//    expect(user.empId).toBe("223306");

  }));
});
