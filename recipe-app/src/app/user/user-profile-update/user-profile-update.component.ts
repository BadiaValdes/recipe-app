import { Component, OnInit, Inject, HostListener } from '@angular/core';

// Dialog
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

// UserPage
import {UserPageService} from '../../service/user-page.service'

// Form
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

// Interface
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.css']
})
export class UserProfileUpdateComponent implements OnInit {

  currentUser : User;

  userUpdateDataForm : FormGroup = this._formBuilder.group ({
    first_name: new FormControl("juan",{validators: [Validators.required]}),
    last_name: new FormControl(null,{validators: [Validators.required]}),
    email: new FormControl(null,{validators: [Validators.required, Validators.email]}),
  })

  constructor(
    private _selfReference : MatDialogRef<UserProfileUpdateComponent>,
    private _userServicePage : UserPageService,
    private _formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) private _userID,
  ) { 
    this._selfReference.disableClose = true;
  }

  ngOnInit(): void {
   
    console.log()

    this.addUsaerDataToForm();
  }

  addUsaerDataToForm(){
    this._userServicePage.getUserDetails(this._userID).toPromise().then(
      data => {
        console.log(data)
        this.currentUser = data
        /* console.log(this.userUpdateDataForm.getRawValue().first_name) */
        // console.log(this.userUpdateDataForm.controls['first_name'].value)

        this.userUpdateDataForm.controls['first_name'].setValue(this.currentUser.first_name)
        this.userUpdateDataForm.controls['last_name'].setValue(this.currentUser.last_name)
        this.userUpdateDataForm.controls['email'].setValue(this.currentUser.email)
      }
    )
  }

  @HostListener('document:keydown.escape')
  closeDialog(){
    this._selfReference.close();
  }

  fistNameControl(){
    return this.userUpdateDataForm.controls['first_name'];
  }
  lastNameControl(){
    return this.userUpdateDataForm.controls['last_name'];
  }
  emailControl(){
    return this.userUpdateDataForm.controls['email'];
  }

  updateUserData(){
    let formData = new FormData;
    formData.set('first_name', this.fistNameControl().value);
    formData.set('last_name', this.lastNameControl().value);
    formData.set('email', this.emailControl().value);
    this._userServicePage.updateUserDetails(this._userID, formData);
    this.closeDialog();
  }

}
