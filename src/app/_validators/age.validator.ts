import { AbstractControl } from '@angular/forms';


export function ageControlValidator(control: AbstractControl) {
    const inputValue = control.value;
    let splitted;
    if (inputValue !== null) {
      splitted = inputValue.split('/');
      splitted = splitted.map(el => {
        el = parseInt(el, 10);
        return el;
      });
      let birth = new Date(splitted[2], splitted[1] - 1, splitted[0]);
      let birthyear = birth.getFullYear();
      let birthmonth = birth.getMonth();
      let birthday = birth.getDate();

      let now = new Date();
      var nowyear = now.getFullYear();
      var nowmonth = now.getMonth();
      var nowday = now.getDate();

      let age: any = nowyear - birthyear;
      let age_month = nowmonth - birthmonth;
      let age_day = nowday - birthday;

      if (age_month < 0 || (age_month == 0 && age_day < 0)) {
        age = parseInt(age) - 1;
      }
      return age < 18 ? {'ageInvalid': true} : null;
    } else return null;
}
