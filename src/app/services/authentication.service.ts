import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { Profile } from '../models/profile';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';



@Injectable()
export class AuthenticateService {
 
  profile: Observable<Profile>;
  
  constructor(private router: Router){ }


  registerUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }
 
  loginUser(value){
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err))
   })
  }  
 
  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("LOG Out");  
                  
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }
 
  userDetails(){
    return firebase.auth().currentUser;
  } 
  
}

