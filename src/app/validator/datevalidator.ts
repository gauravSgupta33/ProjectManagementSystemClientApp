import { FormGroup, ValidatorFn } from '@angular/forms';
//import { AbstractControl, ValidatorFn } from '@angular/forms';


export function DateValidator(startDate: string, endDate: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const f = group.controls[startDate];
      const t = group.controls[endDate];
      
      const startDate1 = new Date(f.value);
      const endDate1 = new Date(t.value);
      console.log(startDate1 + ' ' + endDate1);
      
      if (f === null || t === null) {
        return {
          dates: 'true'
        };
      }
      if (startDate1 > endDate1) {
        return {
          dates: 'true'
        };
      }
      return null;
    };
  }

export function DateValidatorWithBothEmpty(startDate: string, endDate: string) : ValidatorFn {
    return (group: FormGroup): {[key: string]: any} => {
      const f = group.controls[startDate];
      const t = group.controls[endDate];
      console.log(f);
      if (f === null || t === null) {
        return null;
      }
      if(f === null && t != null) {
        return {
          dates: 'true'
        };
      }
      if(f.value === null && t.value != null)  {
        return {
          dates: 'true'
        };
      }
      const startDate1 = new Date(f.value);
      const endDate1 = new Date(t.value);

      console.log(startDate1 + ' ' + endDate1);
      if (startDate1 > endDate1) {
        return {
          dates: 'true'
        };
      }
      return null;
    };
  }

