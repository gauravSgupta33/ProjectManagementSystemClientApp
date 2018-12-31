import {DataHolder} from '../common/DataHolder';
import {NgbdModalContent} from '../dialog/modal/modal-component';
import {ParentTaskVO} from '../model/ParentTaskVO';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {DatePickerComponent, IDayCalendarConfig, } from 'ng2-date-picker';
import {DatepickerOptions} from 'ng2-datepicker';
import {pipe} from 'rxjs';
import {ProjectVO} from '../model/Project';
import {Task} from '../model/Task';
import {ProjectService} from '../services/project-service.service';
import {UserService} from '../services/user-service.service';
import {UserVO} from '../model/User';
import {ParentTaskService} from '../services/parent-task.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TasksService} from '../services/task.service';
import {ErrorMessage} from '../common/errormessage';
import {DateValidator} from '../validator/DateValidator';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  task = new Task();

  @ViewChild('dateFromDp') public dateFromDp: DatePickerComponent;
  @ViewChild('dateToDp') public dateToDp: DatePickerComponent;

  someRange = 0;
  taskStatus: string;
  public taskForm: FormGroup;
  public displayfilterTaskForm: Array<FormGroup> = [];
  public displayDate;
  success = false;
  selectedRow = 0;
  taskName: string;
  project: string;
  user: string;
  dateFrom: string;
  dateTo: string;
  checkboxValue = true;
  search: string;
  openModelDialog = false;
  parent: string;
  myVal = false;
  parentTaskVO: ParentTaskVO;

  showProjectModal = false;
  showUserModal = false;
  showTaskModal = false;

  selectedProjectRow = -1;
  selectedTaskRow = -1;
  selectedUserRow = -1;

  searchProject: string;
  tempProject: ProjectVO = null;

  searchUser: string;
  tempUserVO: UserVO;
  tempTask: ParentTaskVO = null;
  searchTask: string;

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
    private parentTaskService: ParentTaskService, private taskService: TasksService, private errorMessage: ErrorMessage) {
    this.createForm();
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

    if (!this.dataHolder.isParentTaskListLoaded()) {
      this.parentTaskService.getAllParentTasks().subscribe(data => {
        this.dataHolder.addAllParentTasks(data);
      });
    }

  }


  onCloseHandled() {
    this.showUserModal = !this.showUserModal;
  }

  cancel() {
    this.performAdditionalReset();
    this.task = new Task();
    this.someRange = 0;
  }


  private createForm(): void {
    this.taskForm = this.fb.group({
      dateFrom: [null, [Validators.required]],
      dateTo: [null, Validators.compose([Validators.required, DateValidator.bind('dateFrom', 'dateTo')])],
      projectName: [null, [Validators.required]],
      priority: [[0], [Validators.nullValidator]],
      parentTaskName: '',
      userName: ['', [Validators.required]],
      taskName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(100)])],
      parentTaskCheckBox: new FormControl(false)
    });
  }


  public ngOnInit(): void {
    // When dateFrom changes we set the min selectable value for dateTo
    this.taskForm.get('dateFrom').valueChanges.subscribe(value => {
      // this.dateToDp.displayDate = value; // dateTo
      this.dateToDp.minDate = value;
      this.dayPickerConfig = {
        min: value,
        ...this.dayPickerConfig
      };
    });


    this.taskForm.get('parentTaskCheckBox').valueChanges.subscribe(

      (parentTaskCheckBox) => {

        if (!parentTaskCheckBox) {
          this.taskForm.get('dateFrom')['enable']();
          this.taskForm.get('dateFrom').setValidators([Validators.required]);
          this.taskForm.get('dateTo')['enable']();
          this.taskForm.get('dateTo').setValidators(Validators.compose([Validators.required, DateValidator.bind('dateFrom', 'dateTo')]));
          this.taskForm.get('userName').setValidators([Validators.required]);
          this.taskForm.get('priority')['enable']();
          this.taskForm.get('priority').setValidators([Validators.required]);
        } else {
          this.taskForm.get('dateFrom')['disable']();
          this.taskForm.get('dateTo')['disable']();
          this.taskForm.get('dateFrom').setValidators([Validators.nullValidator]);
          this.taskForm.get('dateTo').setValidators([Validators.nullValidator]);

          this.taskForm.get('userName').setValidators([Validators.nullValidator]);
          this.taskForm.get('priority')['disable']();
          this.taskForm.get('priority').setValidators([Validators.nullValidator]);
        }
        this.taskForm.get('dateFrom').updateValueAndValidity();
        this.taskForm.get('dateTo').updateValueAndValidity();
        this.taskForm.get('userName').updateValueAndValidity();
        this.taskForm.get('priority').updateValueAndValidity();

      });

    this.performAdditionalReset();
  }



  openProjectModal() {
    this.selectedProjectRow = -1;
    this.showProjectModal = true;
    this.searchProject = '';
    this.tempProject = null;
  }

  closeProjectModal() {
    if (this.task.project != null) {
      this.taskForm.controls['projectName'].patchValue(this.task.project.projectName);
    }
    this.showProjectModal = false;
  }


  setDblClickedProjectRow(project) {
    if (project == null) {
      this.task.project = new ProjectVO();
    } else {
      this.task.project = project;
    }

    this.showProjectModal = false;
  }

  setClickedProjectRow(project) {
    if (project == null) {
      this.task.project = new ProjectVO();
    } else {
      this.task.project = project;
      this.taskForm.controls['projectName'].patchValue(this.task.project.projectName);
    }
  }


  getParentTaskCheckBoxValue(): boolean {
    return this.taskForm.get('parentTaskCheckBox').value;
  }


  updateTask(taskForm) {
    const parentCheck = this.getParentTaskCheckBoxValue();
    if (parentCheck) {
      const parentTaskVO = new ParentTaskVO();
      parentTaskVO.parent_task = taskForm.controls['taskName'].value;
      this.parentTaskService.addParentTask(parentTaskVO).subscribe(data => {
        this.dataHolder.addParentTask(data);
        this.taskStatus = 'Parent Task Add Status';
        this.success = true;
        this.performAdditionalReset();
      });
    } else {
      const task = new Task();
      task.endDate = new Date(taskForm.value.dateTo);
      task.startDate = new Date(taskForm.value.dateFrom);
      task.priority = this.someRange;
      task.parentId = this.task.parentId;
      task.user = this.task.user;
      task.project = this.task.project;
      task.taskName = taskForm.controls['taskName'].value;

      this.taskService.addTask(task).subscribe(data => {
        this.dataHolder.addTaskCountToCountMap(task.project.projectId);
        this.taskStatus = 'Task Add Status';
        this.success = true;
        this.performAdditionalReset();
      });
    }
  }


  validateDate() {
    const stDate = new Date(this.taskForm.value.dateFrom);
    const edDate = new Date(this.taskForm.value.dateTo);
    if (stDate > edDate) {
      return false;
    }
    return true;

  }

  performAdditionalReset() {
    this.myVal = false;
    this.task = new Task();
    Object.keys(this.taskForm.controls).forEach((controlName) => {
      this.taskForm.controls[controlName].reset();
    });
    this.someRange = 0;
  }

  openTaskModal() {
    this.selectedTaskRow = -1;
    this.showTaskModal = true;
    this.searchTask = '';
    this.tempTask = null;
  }

  closeTaskModal() {
    if (this.tempTask != null) {
      this.taskForm.get('parentTaskName').patchValue(this.tempTask.parent_task);
      this.task.parentId = this.tempTask.parent_ID;

    }
    this.showTaskModal = false;
  }


  setDblClickedTaskRow(task) {
    this.taskForm.get('parentTaskName').patchValue(task.parent_task);
    this.task.parentId = task.parent_ID;

    this.showTaskModal = false;
  }

  setClickedTaskRow(task) {
    this.tempTask = task;
    this.taskForm.get('parentTaskName').patchValue(task.parent_task);
    this.task.parentId = task.parent_ID;
  }

  openUserModal() {
    this.selectedRow = -1;
    this.showUserModal = true;
    this.searchUser = '';
    this.tempUserVO = null;
  }

  closeUserModal() {
    if (this.tempUserVO != null) {
      this.task.user = this.tempUserVO;
      this.taskForm.get('userName').patchValue(this.tempUserVO.empId);
    }
    this.showUserModal = false;
  }


  setDblClickedRow(user) {
    this.task.user = user;
    this.taskForm.get('userName').patchValue(user.empId);
    this.showUserModal = false;
  }


  setClickedRow(user) {
    if (user != null) {
      this.task.user = user;
    } else {
      this.task.user = new UserVO();
    }
  }

  openDialog() {
    this.success = !this.success;
  }
}
