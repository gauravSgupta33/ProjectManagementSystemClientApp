/**
 * New typescript file
 */
import { UserVO } from './User';

export class ProjectVO {
  projectName: string;
  startDate: Date;
  endDate: Date;
  user: UserVO = new UserVO();
  priority: number = 0;
  projectId: number;
}
