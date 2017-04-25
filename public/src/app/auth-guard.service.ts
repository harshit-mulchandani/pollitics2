import { Injectable } from '@angular/core';
import { CanActivate,Router, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';
import {AuthService} from './auth.service';
import {AngularFire} from "angularfire2";

@Injectable()
export class AuthGuardService implements CanActivate{


  constructor(private authService: AuthService, private router: Router,private af:AngularFire) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    let url: string = state.url;

    return this.checkLogin();
  }
  //
  checkLogin() {
   if(this.authService.isLoggedIn==true) {
     console.log("login hain",this.authService.isLoggedIn);
     return true;
   }

     this.router.navigate(['/auth'],);
     return false;

  }
}
