import { Component, OnInit } from '@angular/core';

// Dialog
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

//Snack bar
import {MatSnackBar} from '@angular/material/snack-bar';

// Component
import {RecipeCreateComponent} from '../recipe-create/recipe-create.component'
import { Router, ActivatedRoute } from '@angular/router';
import {RecipeSnackCreateComponent} from '../recipe-sub-components/recipe-snack-create/recipe-snack-create.component'


@Component({
  selector: 'app-recipe-main',
  templateUrl: './recipe-main.component.html',
  styleUrls: ['./recipe-main.component.css']
})
export class RecipeMainComponent implements OnInit {

  opened: boolean = false;

  changeOpenArrowDirection(){
    this.opened = this.opened ? false : true;
  }

  constructor(public matDialog : MatDialog,
    private snackBar : MatSnackBar,
    private router : Router,
    private route : ActivatedRoute) { }

  showEvent(p: string){
    console.log(p)
  }

  openCreateDialog(){
    const matDiag = this.matDialog.open(RecipeCreateComponent, {
      width: '900px',
    });

    matDiag.afterClosed().subscribe((data : number) => {
    if(data == 2)
    {
      // get url param
      //let state = this.route.snapshot.queryParams.done
     
          this.openSnack("Ya se puede cocinar la nueva receta");
      
   
    }
    if(data == 3)
     {
      this.openSnack("La receta se quemó en el fuego");
     }
   
    })
  }

  ngOnInit(): void {
    
  }

  openSnack(message: string) {
    this.snackBar.open(message, "Cerrar",{duration: 3 * 1000})
  }

}
