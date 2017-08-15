import {AbstractControl} from '@angular/forms';

export class ConfirmPasswordValidator {
  static matchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('passwordConfirm').value; // to get value in input tag
    if(confirmPassword && password !== confirmPassword) {
      AC.get('passwordConfirm').setErrors( {match: true} )
    } else {
      return null
    }
  }
}
