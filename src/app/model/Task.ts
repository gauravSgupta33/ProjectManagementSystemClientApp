import {ProjectVO} from './Project';
import {UserVO} from './User';

export class Task {
  taskId: number;
  parentId: number;
  startDate: Date;
  endDate: Date;
  priority: number;
  status: number;
  user: UserVO = new UserVO();
  project: ProjectVO = new ProjectVO();
  taskName: string;
}
