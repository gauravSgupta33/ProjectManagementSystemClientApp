import {UserVO} from '../model/User';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter((it: UserVO) => {
      return (it.firstName.toString().toLowerCase().includes(searchText)
        || it.lastName.toString().toLowerCase().includes(searchText)
        || it.empId.toString().toLowerCase().includes(searchText));
    });
  }
}
