import {DataHolder} from '../../common/DataHolder';
import {ErrorMessage} from '../../common/errormessage';
import {NgbdModalContent} from '../../dialog/modal/modal-component';
import {ParentTaskVO} from '../../model/ParentTaskVO';
import {DatePipe} from '@angular/common';
import {Component, OnInit, ViewChild, Output, EventEmitter, Input} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import {DatePickerComponent, IDayCalendarConfig, } from 'ng2-date-picker';
import {DatepickerOptions} from 'ng2-datepicker';
import {pipe} from 'rxjs';
import {ProjectVO} from '../../model/Project';
import {Task} from '../../model/Task';
import {ProjectService} from '../../services/project-service.service';
import {UserService} from '../../services/user-service.service';
import {UserVO} from '../../model/User';
import {ParentTaskService} from '../../services/parent-task.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {TasksService} from '../../services/task.service';
import {DateValidatorWithBothEmpty} from '../../validator/DateValidator';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  task = new Task();
  @ViewChild('dateFromDp') public dateFromDp: DatePickerComponent;
  @ViewChild('dateToDp') public dateToDp: DatePickerComponent;

  // getting value from parent to child
  @Input('showViewTask') showViewTask: boolean;

  @Input('taskToEdit') taskToEdit: Task;

  @Output() childToParent = new EventEmitter<object>();

  someRange = 1;
  taskStatus: string;
  public filterEditTaskForm: FormGroup;
  public displayDate;
  success = false;
  dateFrom: string;
  dateTo: string;
  search: string;
  openModelDialog = false;

  showTaskModal = false;
  selectedTaskRow = -1;

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

  sendToParent(object) {
    this.dataHolder.setShowEditTab(false);
    this.dataHolder.removeTab("Edit Task");
    this.childToParent.emit({editedTask: this.taskToEdit, status: true});
  }


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

  public ngOnInit(): void {
    // When DateFrom changes we set the min selectable value for DateTo
    this.filterEditTaskForm.get('dateFrom').valueChanges.subscribe(value => {
      // this.dateToDp.displayDate = value; // DateTo
      this.dateToDp.minDate = value;
      this.dayPickerConfig = {
        //min: value,
        ...this.dayPickerConfig
      };
    });
    console.log(this.taskToEdit);
    this.filterEditTaskForm.get('dateFrom').setValue(new DatePipe('en-US').transform(this.taskToEdit.startDate, 'MM-dd-yyyy'));
    this.filterEditTaskForm.get('dateTo').setValue(new DatePipe('en-US').transform(this.taskToEdit.endDate, 'MM-dd-yyyy'));
    this.dataHolder.getParentTaskById(this.taskToEdit.parentId);
    this.filterEditTaskForm.get('parentTaskName').patchValue(this.dataHolder.getParentTaskById(this.taskToEdit.parentId));



  }




  updateTask() {
    //    if (!this.validateDate()) {
    //
    //      return;
    //    }

    this.taskToEdit.priority = this.filterEditTaskForm.value.priority;
    this.taskToEdit.startDate = new Date(this.filterEditTaskForm.value.dateFrom);
    this.taskToEdit.endDate = new Date(this.filterEditTaskForm.value.dateTo);

    if (!this.validateDate()) {
      return;
    }

    this.taskService.updateTask(this.taskToEdit.taskId, this.taskToEdit).subscribe(data => {
      const tasks1 = this.dataHolder.getTaskByProjectId(this.taskToEdit.project.projectId);

      for (let i = 0; i < tasks1.length; i++) {
        if (tasks1[i].taskId === this.taskToEdit.taskId) {
          tasks1[i] = data;
        }
      }
      //this.dataHolder.setShowEditTab(false);
      this.taskStatus = 'Task Add Status';
      this.success = true;
      this.sendToParent(null);
    });
  }


  validateDate() {
    const startDate = this.filterEditTaskForm.value.dateFrom;
    const endDate = this.filterEditTaskForm.value.dateTo;
    if ((startDate === null || startDate === '') && this.taskToEdit.endDate != null) {
      try {
        const d = new Date(this.taskToEdit.endDate);
      } catch (e) {
        alert('Start date cannot be blank');
        return false;
      }
      alert('Start date cannot be blank');

      return false;
    }
    if (this.taskToEdit.startDate != null && (endDate === null || endDate === '')) {
      try {
        const d = new Date(this.taskToEdit.endDate);

      } catch (e) {
        alert('End date cannot be blank');
        return false;
      }
      alert('End date cannot be blank');

      return false;
    }
    const stDate = new Date(this.taskToEdit.startDate);
    const edDate = new Date(this.taskToEdit.endDate);
    if (stDate > edDate) {
      alert('Start date cannot be greater than end date. Please correct the date');
      return false;
    }

    if (edDate < stDate) {
      alert('Start date cannot be greater than end date. Please correct the date');
      return false;
    }
    return true;

  }

  openTaskModal() {
    this.selectedTaskRow = -1;
    this.showTaskModal = true;
    this.searchTask = '';
    this.tempTask = null;
  }

  closeTaskModal() {
    if (this.tempTask != null) {
      this.filterEditTaskForm.get('parentTaskName').patchValue(this.tempTask.parent_task);
      this.taskToEdit.parentId = this.tempTask.parent_ID;

    }
    this.showTaskModal = false;
  }


  setDblClickedTaskRow(task) {
    this.filterEditTaskForm.get('parentTaskName').patchValue(task.parent_task);
    this.taskToEdit.parentId = task.parent_ID;

    this.showTaskModal = false;
  }

  setClickedTaskRow(task) {
    this.tempTask = task;
    this.filterEditTaskForm.get('parentTaskName').patchValue(task.parent_task);
    this.taskToEdit.parentId = task.parent_ID;
  }



  openDialog() {
    this.success = !this.success;
  }

  private createForm(): void {
    this.filterEditTaskForm = this.fb.group({
      dateFrom: new FormControl(),
      dateTo: new FormControl(),
      priority: new FormControl(),
      parentTaskName: new FormControl(),
    });
    this.filterEditTaskForm.get('dateTo').setValidators([DateValidatorWithBothEmpty.bind('dateFrom', 'dateTo')]);
  }
}
