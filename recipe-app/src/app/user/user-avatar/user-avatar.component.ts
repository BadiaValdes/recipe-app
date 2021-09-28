import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { UserPageService } from 'src/app/service/user-page.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {

  constructor(private cd : ChangeDetectorRef, private _user: UserPageService, @Inject(MAT_DIALOG_DATA) public data ) { }

  imageToShow;
  imageData;

  ngOnInit(): void {
    console.log(this.data)
  }

    // Clear the file field for now drop object
    clearFile(event)
    {
      event.target.value = null;  
      this.cd.markForCheck; 
    }
  
    // LOADS the file that user selects
    onFileSelect(event) {
      let reader = new FileReader(); // Create the file rider var
      if (event.target.files.length > 0 && event.target.files) {
        // Has the input any value
        const [file2] = event.target.files; // Save That value
        reader.readAsDataURL(file2) // Read That Value
  
        // what happened in the load process
        reader.onload = () => {
  
           
         
            this.imageToShow = reader.result // Save the result value after read in the var that will show the image to user
           
  
          this.cd.markForCheck; // Detect the reference
        }    
      
        //const file = event.target.files[0]
        const file = event.target.files[0] // save the file into a variable
        this.imageData = file; // save it again why?       
       
   
      }}
      //this.recipeForm.get('img').setValue(event.target.files[0]);
    
    updateImage(){   
        console.log(this.data.type)  
        const form = new FormData();
        if(this.data.type == 1){
          form.set('avatar',this.imageData)      
          this._user.updateUserAvatar(this.data.user,form);   
        }
        else if (this.data.type == 2)
        {
          form.set('background_image',this.imageData)     
          this._user.updateUserBackground(this.data.user,form);   
        }
        
    }

}
