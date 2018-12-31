import {DataHolder} from '../common/DataHolder';
import {ErrorMessage} from '../common/errormessage';
import {NgbdModalContent} from '../dialog/modal/modal-component';
import {DatePipe} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators, Validator} from '@angular/forms';
import {DatePickerComponent, IDayCalendarConfig, } from 'ng2-date-picker';
import {DatepickerOptions} from 'ng2-datepicker';
import {pipe} from 'rxjs';
import {ProjectVO} from '../model/Project';
import {TaskCounterVO} from '../model/TaskCounterVO';
import {ProjectService} from '../services/project-service.service';
import {UserService} from '../services/user-service.service';
import {UserVO} from '../model/User';
import {TasksService} from '../services/task.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {transform} from 'typescript';
import {DateValidator} from '../validator/DateValidator';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  project = new ProjectVO();

  @ViewChild('dateFromDp') public dateFromDp: DatePickerComponent;
  @ViewChild('dateToDp') public dateToDp: DatePickerComponent;

  public projectForm: FormGroup;
  public displayfilterForm: Array<FormGroup> = [];
  public displayDate;
  dateFrom: string;
  dateTo: string;
  //checkboxValue = true;
  search: string;
  openModelDialog = false;
  //checkBox: boolean;
  pipe = new DatePipe('en-US'); // Use your own locale
  display = 'none';
  show = false;
  selectedRow = 0;
  addUpdateButton = 'Add Project';
  myVal = false;
  projectStatus = 'Project Add';
  success = false;

  searchUser: string;
  tempUserVO: UserVO;

  sortType: string;
  direction: number;
  someRange = 0;

  map = new Map<string, number>();



  dayPickerConfig = <IDayCalendarConfig>{
    locale: 'en',
    format: 'MM-DD-YYYY',
    monthFormat: 'MMMM, YYYY',
    firstDayOfWeek: 'mo',
    disabled: true,
    disableKeypress: true
  };

  constructor(private fb: FormBuilder, private dataHolder: DataHolder,
    private projectService: ProjectService, private userService: UserService,
    private taskService: TasksService, private errorMessage: ErrorMessage) {
    this.map.set('startDate', 1);
    this.map.set('endDate', 1);
    this.map.set('priority', 1);
    this.map.set('completed', 1);

    if (!this.dataHolder.isUserListLoaded()) {
      this.userService.getUsers().subscribe(data => {
        this.dataHolder.addAllUser(data);
      });
    }

    if (!this.dataHolder.isProjectListLoaded()) {
      this.projectService.getProjects().subscribe(data => {
        this.dataHolder.addAllProjects(data);
      });
    }

    this.createForm();

    this.projectService.getProjects().subscribe(data => {
      this.dataHolder.addAllProjects(data);
    });
  }

  public ngOnInit(): void {
    // When DateFrom changes we set the min selectable value for DateTo
    this.projectForm.get('dateFrom').valueChanges.subscribe(value => {
      this.dateToDp.minDate = value;
      this.dayPickerConfig = {
        min: value,
        ...this.dayPickerConfig
      };
    });
    this.subscribeCheckBox();
    this.performAdditionalReset();
  }

  subscribeCheckBox() {
    this.projectForm.get('checkBox').valueChanges.subscribe(

      (checkBox) => {

        if (checkBox) {
          this.projectForm.get('dateFrom')['enable']();
          this.projectForm.get('dateTo')['enable']();
          this.projectForm.get('dateFrom').setValidators([Validators.required]);
          this.projectForm.get('dateTo').setValidators(Validators.compose([Validators.required, DateValidator.bind('dateFrom', 'dateTo')]));
        } else {
          this.projectForm.get('dateFrom')['disable']();
          this.projectForm.get('dateTo')['disable']();
          this.projectForm.get('dateFrom').setValidators([Validators.nullValidator]);
          this.projectForm.get('dateTo').setValidators([Validators.nullValidator]);
        }
        this.projectForm.get('dateFrom').updateValueAndValidity();
        this.projectForm.get('dateTo').updateValueAndValidity();

      });

  }


  //  DateValidator(startDate: string, endDate: string) {
  //    return (group: FormGroup): {[key: string]: any} => {
  //      const f = group.controls[startDate];
  //      const t = group.controls[endDate];
  //      if (f === null || t === null) {
  //        return {
  //          dates: 'true'
  //        };
  //      }
  //      if (f.value > t.value) {
  //        return {
  //          dates: 'true'
  //        };
  //      }
  //      return null;
  //    };
  //  }

  openDialog() {
    this.success = !this.success;
  }

  addProject(project) {
    const tempProject = new ProjectVO();
    tempProject.projectName = project.projectName;
    tempProject.startDate = new Date(this.projectForm.value.dateFrom);
    tempProject.endDate = new Date(this.projectForm.value.dateTo);
    tempProject.user = this.tempUserVO;
    tempProject.priority = project.priority;

    if (this.addUpdateButton === 'Update Project') {
      tempProject.projectId = this.project.projectId;
      this.projectService.updateProject(tempProject.projectId, tempProject).subscribe(data => {
        this.projectStatus = 'Project Add Status';
        this.success = true;
        this.dataHolder.addProject(data);
        this.performAdditionalReset();
      });
    } else {
      this.projectService.addProject(tempProject).subscribe(data => {
        this.dataHolder.addProject(data);
        this.dataHolder.addProjectTaskCount(data.projectId, new TaskCounterVO());
        this.projectStatus = 'Project Add Status';
        this.success = true;
        this.performAdditionalReset();
      });
    }
  }

  performAdditionalReset() {
    //this.createForm();
    this.tempUserVO = null;
    //this.subscribeCheckBox();
    //    this.projectForm.controls['dateFrom'].reset();
    Object.keys(this.projectForm.controls).forEach((controlName) => {
      //      if (controlName != 'checkBox') {
      this.projectForm.controls[controlName].reset();
      //      }// disables/enables each form control based on 'this.formDisabled'
    });
    //this.projectForm.controls['checkBox'].setValue(false);
    this.someRange = 0;
  }




  updateProject(project, index) {
    if (project.startDate != null && project.startDate.length > 0) {
      const pipe = new DatePipe('en-US');
      this.projectForm.get('dateFrom').patchValue(pipe.transform(project.startDate, 'MM-dd-yyyy'));
      this.projectForm.get('dateTo').patchValue(pipe.transform(project.endDate, 'MM-dd-yyyy'));
      this.projectForm.get('checkBox').patchValue('1');
      this.myVal = true;
      this.tempUserVO = project.user;
      this.project = project;
    }
    this.projectForm.get('projectName').patchValue(project.projectName);
    this.someRange = project.priority;
    this.projectForm.get('managerId').patchValue(this.tempUserVO.empId);
    this.addUpdateButton = 'Update Project';

  }


  openModal() {
    this.selectedRow = -1;
    this.show = true;
    this.searchUser = '';
    this.tempUserVO = null;
  }

  onCloseHandled() {
    if (this.tempUserVO != null) {
      this.projectForm.controls['managerId'].patchValue(this.tempUserVO.empId);
    }
    this.show = false;
  }


  getCompletedTaskCount(projectId): number {
    //    let tasks;
    //    tasks = this.dataHolder.getTaskByProjectId(projectId);
    //    if (tasks === null || tasks.length <= 0) {
    //      return 0;
    //    } else {
    //      let completedCount = 0;
    //      for (let i = 0; i < tasks.length; i++) {
    //        if (tasks[i].status === 1) {
    //          completedCount++;
    //        }
    //      }
    //      return completedCount;
    //    }
    return this.dataHolder.getProjectTaskCouter(projectId).completedCount;
  }

  getTotalTaskCount(projectId): number {
    //    if (this.dataHolder.getTaskByProjectId(projectId) === null) {
    //      this.taskService.getTasksByProjectId(projectId).subscribe(data => {
    //        this.dataHolder.addProjectTaskMap(projectId, data);
    //        return data.length;
    //      });
    //    } else {
    //      let tasks;
    //      tasks = this.dataHolder.getTaskByProjectId(projectId);
    //      return tasks.length;
    //    }
    return this.dataHolder.getProjectTaskCouter(projectId).taskCount;
  }

  setDblClickedRow(user) {
    this.tempUserVO = user;
    this.projectForm.controls['managerId'].patchValue(user.empId);

    this.show = false;
  }

  setClickedRow(user) {
    if (user != null) {
      this.tempUserVO = user;
    } else {
      this.tempUserVO = new UserVO();
    }
  }

  getCheckBoxVal() {
    return this.projectForm.get('checkBox').value;
  }

  private createForm(): void {
    this.projectForm = this.fb.group({
      dateFrom: [null, [Validators.required]],
      dateTo: [null, Validators.compose([Validators.required, DateValidator.bind('dateFrom', 'dateTo')])],
      checkBox: new FormControl(false),
      projectName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      priority: [[0], [Validators.nullValidator]],
      managerId: ['', [Validators.required]]
    });
  }

  sortProject(type1) {
    this.sortType = type1;
    this.direction = this.map.get(type1);
    this.map.set(type1, (this.direction * -1));
  }
}
