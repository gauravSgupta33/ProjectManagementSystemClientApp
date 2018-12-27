import { ParentTaskVO } from '../model/ParentTaskVO';
import { ProjectVO } from '../model/Project';
import {UserVO} from '../model/User';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'parentTaskSearchFilter'
})
export class ParentTaskModalSerachFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((it: ParentTaskVO) => {
      return (it.parent_task.toString().toLowerCase().includes(searchText));
    });
  }
}
