import {Component, OnInit} from '@angular/core';
import {AuthComponent} from "./auth/auth.component";
import {AuthService} from "./auth.service";
import {AngularFire} from "angularfire2";
import {DataService} from "./data.service";
import {Router} from "@angular/router";
import {PreloaderService} from "./preloader.service";
declare var jQuery:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  imageUrl:any;
  userName:any;
  isLoggedIn:any;
  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true,
  };
  constructor(private _authService:AuthService,private loader:PreloaderService,private af:AngularFire,private _dataService:DataService,private router:Router){

    this.af.auth.subscribe(
      (auth)=>
      {
        if(auth) {
          if (auth.facebook) {
            this.isLoggedIn = true;
            this.userName = auth.auth.displayName;
            this.imageUrl = auth.auth.photoURL;

          }else{
            this.isLoggedIn = true;
            this.userName = auth.auth.email;
            this.imageUrl = "../assets/img/user-avatar.png";

          }
        }
        else {
          this.isLoggedIn = false;
          //this.router.navigateByUrl('/auth');
        }

      });





    console.log("IN APP");
    //this.setUser();
  }

logout(){
    this._authService.logout();
  jQuery("#snackbar").html("<div>Logged Out !</div>");
    jQuery("#snackbar").addClass("show");
    setTimeout(()=>{jQuery("#snackbar").removeClass("show");},3000)

}

gotoHome(){
  this.router.navigateByUrl('/polls');
}
ngOnInit(){

}


}
