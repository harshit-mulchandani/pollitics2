import {Injectable, EventEmitter} from '@angular/core';
import {AngularFire, AuthMethods, AuthProviders, FirebaseObjectObservable} from 'angularfire2';



import { FacebookService, InitParams ,LoginOptions} from 'ngx-facebook';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {Router} from "@angular/router";
import {location} from "@angular/platform-browser/src/facade/browser";
import {DataService} from "./data.service";

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  userName = new Observable<string>();
  profileImg = new Observable<string>();
  allTempRegisteredUsers:any;
  allRegisteredUsers:any[];
  loggedInEmail:any;
  trimmedemail:any;
  displayName:any;
  error: any;
  name: any;
  normalProfileImg: any;
 // public trimmedemail: any;
 // displayName: any;
 // username: any;
 // allTempRegisteredUsers: any;
  //allRegisteredUsers: any[];
 // isLoggedIn = false;
  authemail: any;
  public userValue: FirebaseObjectObservable<any>;

  constructor(public af: AngularFire,private router: Router,private dataService:DataService,private _facebookService:FacebookService){
    this.dataService.userData.subscribe(data=> {
      this.allTempRegisteredUsers = data;
      const obj = this.allTempRegisteredUsers;
      const arr = [];
      for (const prop in obj) {
        arr.push(obj[prop]);
      }
      //console.log(arr);
      this.allRegisteredUsers = arr;
    });

    this.af.auth.subscribe(auth => {
      if(auth) {
        if (auth.facebook) {
          this.router.navigateByUrl('/polls');
          console.log(auth);
          this.userName = Observable.of(auth.auth.displayName);
          this.profileImg = Observable.of(auth.auth.photoURL);
          this.loggedInEmail = auth.auth.email;
          this.displayName = auth.auth.displayName;
        }
        else {
          this.userName = Observable.of(auth.auth.email);

        }
      }
    });

    let fbParams: InitParams = {
      appId: '1476761555721116',
      xfbml: true,
      version: 'v2.6'
    };
    this._facebookService.init(fbParams);
  }




  //error:any;

  // store the URL so we can redirect after logging in
  redirectUrl: string;




  // login(): Observable<boolean> {
  //   return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  // }




  logout(): void {

    this.af.auth.logout();
    this.isLoggedIn = false;
    //console.log("phle",this.isLoggedIn);
    this.loggedInEmail="";
    //location.reload();
    //console.log("baad",this.isLoggedIn)

  }

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.router.navigate(['/polls']);
        this.isLoggedIn = true;
        console.log(this.isLoggedIn);
        let c = 0;
        for (let i = 0; i < this.allRegisteredUsers.length; i++) {
          if (this.allRegisteredUsers[i].email != this.loggedInEmail) {
            c++;
          }
        }
        if (c == this.allRegisteredUsers.length) {

          this.trimmedemail = this.loggedInEmail.split('.');
          return this.af.database.object('registeredUsers').update({
            [this.trimmedemail[0]]: {
              username: this.displayName,
              email: this.loggedInEmail
            }


        });
        }


      }).catch(
      (err) => {
        this.error = err;
      })

  };

  createUser(value) {
    this.af.auth.createUser({
      email: value.regemail,
      password: value.regpassword
    }).then(
      (user) => {
        console.log(user);
        this.router.navigateByUrl('/polls');
        this.isLoggedIn = true;
        // this.router.navigate(['admin']);
        //   if (user) {
        //     // User is signed in.
        //     user.updateProfile({
        //       displayName: value.regname
        //     }).then(function() {
        //       // Update successful.
        //     }, function(error) {
        //       // An error happened.
        //     });
        //   }
        //   else {
        //     // No user is signed in.
        //   }
      }).catch(
      (err) => {
        console.log(err);
        this.error = err;
      });
  }

  loginUser(value) {
    this.af.auth.login({
        email: value.logemail,
        password: value.logpassword
      },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password,
      }).then(
      (success) => {
        console.log(success);
        this.isLoggedIn = true;
        this.router.navigate(['/polls']);
        this.profileImg = this.normalProfileImg;

      }).catch(
      (err) => {
        console.log(err);
        this.error = err;
      });
  }

  saveUserInfoFromForm(name, email) {
    this.trimmedemail = email.split('.');
    return this.af.database.object('registeredUsers').update({
      [this.trimmedemail[0]]: {
        username: name,
        email: email
      }
    });
  }






}
