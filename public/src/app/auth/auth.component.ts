import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import { FacebookService, InitParams } from 'ngx-facebook';
import {FormGroup, Validators, FormControl} from "@angular/forms";
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";

declare var $:any;
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public loginPage = false;
  public registerPage = true;
  public error: any;
  registerForm: FormGroup;
  loginForm: FormGroup;
  constructor( private _authService: AuthService,private router:Router,private fb: FacebookService,private af:AngularFire) {


    this.af.auth.subscribe(data=>
    {
      if(data){

        this.router.navigateByUrl('/polls');
      }
    });

    this.registerForm = new FormGroup({
      'regname':new FormControl('', Validators.required),
      'regemail':new FormControl('', Validators.required),
      'regpassword':new FormControl('', Validators.required),
      'reppassword':new FormControl('', Validators.required)
    });
    this.loginForm = new FormGroup({
      'logemail': new FormControl('', Validators.required),
      'logpassword': new FormControl('', Validators.required)
    });


  }

  ngOnInit() {
  }

  registerTab() {
    $('#register-tab').addClass('active-tab');
    $('#login-tab').removeClass('active-tab');
    this.registerPage = true;
    this.loginPage = false;
  }

  loginTab() {
    $('#register-tab').removeClass('active-tab');
    $('#login-tab').addClass('active-tab');
    this.registerPage = false;
    this.loginPage = true;
  }
  loginfb(){
    this._authService.loginFb();
  }

  onRegSubmit() {
    $("#snackbar").html("<div>Khata khul raha hai !</div>");
    $("#snackbar").addClass("show");
    //this.hide();
    setTimeout(() => { $("#snackbar").removeClass("show"); }, 3000);
    this._authService.createUser(this.registerForm.value);
    this._authService.saveUserInfoFromForm(this.registerForm.value.regname, this.registerForm.value.regemail);
  }
  onLogSubmit() {
    $("#snackbar").html("<div>Ruk jaa re bande......</div>");
    $("#snackbar").addClass("show");
    //this.hide();
    setTimeout(() => { $("#snackbar").removeClass("show"); }, 3000);
    this._authService.loginUser(this.loginForm.value);
  }


}
