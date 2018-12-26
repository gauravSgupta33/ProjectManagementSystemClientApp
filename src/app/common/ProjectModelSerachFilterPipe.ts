import { ProjectVO } from '../model/Project';
import {UserVO} from '../model/User';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'projectSearchFilter'
})
export class PrjoectModalSearchFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((it: ProjectVO) => {
      return (it.projectName.toString().toLowerCase().includes(searchText));
    });
  }
}
