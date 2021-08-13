import { Component, OnInit, Inject } from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet'; 
import {MatDialog, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material/dialog';
// Service 
import {RecipeService} from '../../../service/recipe.service'
import {ConfirmDialogServiceService} from '../../../service/confirm-dialog-service.service'

// Router
import { Router, ActivatedRoute } from '@angular/router';

// General Dialog
import {ConfigDialogComponent} from '../../../reusables/config-dialog/config-dialog.component'

// Create Component
import {RecipeCreateComponent} from '../../recipe-create/recipe-create.component'




@Component({
  selector: 'app-recipe-options',
  templateUrl: './recipe-options.component.html',
  styleUrls: ['./recipe-options.component.css']
})
export class RecipeOptionsComponent implements OnInit {

  

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any, // Injects parent data
    private _recipeService : RecipeService, // API of recipes
    private _router: Router, // Controls the URL
    private _selfMatBSReference: MatBottomSheetRef<RecipeOptionsComponent>, // Self reference
    private _dialog: MatDialog, // Dialog reference
    private _confirmDialogService : ConfirmDialogServiceService, // Dialog service reference
  ) {
    console.log(data)
   }

  ngOnInit(): void {
  }

  // Open the dialog service 
  openTheDialog(){
    // Services options
    const options = {
      name: "delete",
      title: "Quemar la receta",
      description: "Seguro que desea quemar la receta en el fuego enterno?",
      actionButton: "Delete",
    }
    this._confirmDialogService.openDialog(options) // Open the dialog with the options
    // On dialog close
    this._confirmDialogService.dialogFinalValue().subscribe(data => {
      if(data)
      {
        this.eliminarReceta()
      }
    })
    /* const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "recipe-delete-dialog";
    dialogConfig.data = {
      name: "delete",
      title: "Quemar la receta",
      description: "Seguro que desea quemar la receta en el fuego enterno?",
      actionButton: "Delete",
    }
    const deleteDialog = this._dialog.open(ConfigDialogComponent, dialogConfig)

    deleteDialog.afterClosed().subscribe((data : boolean)=> {
      if(data)
      {
        this.eliminarReceta()
      }
    }) */
  }

  // Delete Recipe
  eliminarReceta(){

     this._recipeService.deleteRecipe(this.data.currentID).then(_ => {
      this._selfMatBSReference.dismiss()
      this._router.navigate(['./recipe'])
    }) 
    
  }

  //Modify Recipe - PUT
  modificarReceta(){
    this._dialog.open(RecipeCreateComponent, {data: this.data.recipe})
    console.log()
  }

}
