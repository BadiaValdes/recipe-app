import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserPageService } from 'src/app/service/user-page.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-password-change',
  templateUrl: './user-password-change.component.html',
  styleUrls: ['./user-password-change.component.css']
})
export class UserPasswordChangeComponent implements OnInit {

  hide = true

  passwordForm = new FormGroup(
    {
      userNewPassword: new FormControl(null,{validators:[Validators.required]}),
      userNewPasswordSecond: new FormControl(null,{validators:[Validators.required,], updateOn: 'blur'}),
    }
  )

  // Second Passwrod Validator
 /*  secondPasswordMatchFirst() :ValidatorFn{
    return (control : AbstractControl)  => {
   
        return this.passwordForm.get('userNewPassword') && this.passwordForm.get('userNewPassword').value !== control.value ? {wrongPassword: "Debe ser mayor"} : null
    }
  } */
  // End Second Password Validator
  constructor(
    private _user : UserPageService,
    @Inject(MAT_DIALOG_DATA) public matData
  ) { }

  ngOnInit(): void {
  }

  submitInfo(){
    let data = new FormData();
    data.set('password',this.passwordForm.get('userNewPassword').value)
    data.set('password2',this.passwordForm.get('userNewPasswordSecond').value)
    this._user.updateUserPassword(this.matData, data)
  }

}
