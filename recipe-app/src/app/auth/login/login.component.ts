import { Component, OnInit } from '@angular/core';

//service 

import {UserService} from '../../service/user.service'

import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  snackBarDuration = 5; // The snack duration configuration
  
  // a Dictionary
  public user = {
    username : "",
    password : "",
  };

  public toke; // User Token

  constructor(public user_service : UserService, private snackbar : MatSnackBar) { }

  ngOnInit(): void {
  }

  login() {
    try{
      this.user_service.logIn({'username': this.user.username, 'password': this.user.password}).then( () => {}, ()=> {
        // If error exist
        if(this.user_service.getError()){    
          console.log(this.user_service.getError())  // Show error          
        this.createSnackMessage(this.user_service.getCodeStatus());// Get Code
      }
    })
    }
    catch (e) {

    }
   
    
  }



  createSnackMessage(request){
    console.log(request)
    if(request == 0){
      this.showSnackBar("No Existe conexion");
    }
    else if(request == 400){
      this.showSnackBar("Datos Invalidos");
    }
    else if(request == 200){
      this.showSnackBar("Ya esta dentro");
    }
  }
 
  refreshToken() {
    this.user_service.refreshToken();
  }
 
  logout() {
    this.user_service.logout();
  }

  getToke(){
    this.toke = this.user_service.getLocalSotrageToken();
  }

  showSnackBar(message: any){
    this.snackbar.open(message, "Close");
  }

}
