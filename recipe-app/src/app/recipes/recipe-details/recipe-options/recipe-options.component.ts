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

@Component({
  selector: 'app-recipe-options',
  templateUrl: './recipe-options.component.html',
  styleUrls: ['./recipe-options.component.css']
})
export class RecipeOptionsComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private _recipeService : RecipeService,
    private _router: Router,
    private _selfMatBSReference: MatBottomSheetRef<RecipeOptionsComponent>,
    private _dialog: MatDialog,
    private _confirmDialogService : ConfirmDialogServiceService,
  ) {
    console.log(data)
   }

  ngOnInit(): void {
  }

  openTheDialog(){
    const options = {
      name: "delete",
      title: "Quemar la receta",
      description: "Seguro que desea quemar la receta en el fuego enterno?",
      actionButton: "Delete",
    }
    this._confirmDialogService.openDialog(options)
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

     this._recipeService.deleteRecipe(this.data).then(_ => {
      this._selfMatBSReference.dismiss()
      this._router.navigate(['./recipe'])
    }) 
    
  }

}
