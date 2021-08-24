import { Component, OnInit, Inject } from '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

import {SplitInterfacePipe} from '../split-interface.pipe'
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-instant-details',
  templateUrl: './recipe-instant-details.component.html',
  styleUrls: ['./recipe-instant-details.component.css']
})
export class RecipeInstantDetailsComponent implements OnInit {

  ingrediente_principal= null;
  constructor(
    private _router : Router,
    private _ownReference: MatDialogRef<RecipeInstantDetailsComponent>,    
    @Inject(MAT_DIALOG_DATA) public data : any,
  ) { }

  ngOnInit(): void {
    this.data.ingredientes.forEach(element => {
     if(this.splitMe(element, '-', 2) === 'True')
     {
       this.ingrediente_principal = this.splitMe(element, '-', 0);
     }
    });
  }

  close(num? : number){
    if(num && num == 1)
    {
      this._router.navigateByUrl(`recipe/${this.data.recip.slug}`, {state: this.data.recip})
    }
    this._ownReference.close()
  }

  splitMe(text: string, splitby: string, index: number): any {
    let p = text.split(splitby);
    console.log(p[index]);
    return p[index];
  }

}
