import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import {DataHolder} from '../common/DataHolder';
import { ErrorMessage } from '../common/errormessage';
import {UserVO} from '../model/User';
import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {UserServiceMock} from '../services/mocks/user-service-mock';
import { CustomSortingPipe } from '../common/CustomSortingPipe';
import { UserFilterPipe } from '../common/filterpipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userFilter: UserFilterPipe;
  let SortBy: CustomSortingPipe;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFilterPipe, CustomSortingPipe, UserComponent ],
       imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [DataHolder, ErrorMessage, { provide: UserService, useClass: UserServiceMock }
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
});
