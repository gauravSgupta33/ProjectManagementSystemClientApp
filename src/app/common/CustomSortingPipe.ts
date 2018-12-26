import {UserVO} from '../model/User';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'SortBy'
})
export class CustomSortingPipe implements PipeTransform {
  transform(items: any[], args?: any): any[] {
    return items.sort(function(a, b) {
      if (a[args.property] === null) {
        return 0;
      }

      let val = a[args.property] + '';
      if (val.toString().length <= 0) {
        return 0;
      }

      if (b[args.property] === null) {
        return 0;
      }

      let val1 = b[args.property] + '';
      if (val1.toString().length <= 0) {
        return 0;
      }
      if (a[args.property] < b[args.property]) {
        return -1 * args.direction;
      } else if (a[args.property] > b[args.property]) {
        return 1 * args.direction;
      } else {
        return 0;
      }
    });
  }
}
