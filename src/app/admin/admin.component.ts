import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {DataService} from "../data.service";
import {Router} from "@angular/router";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import {AuthService} from "../auth.service";
//import {jQuery} from "../polls/polls.component";
declare var jQuery:any;
declare var Spinner:any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public id: FirebaseObjectObservable<any>;
  createPoll: FormGroup;
  receivedId: any;
  profileImg:any;
  userName:any;
  titleemp:any;
  descemp:any;
  op1emp:any;
  op2emp:any;
  op3emp:any;

  constructor(private dataService: DataService, private _authService: AuthService,private router: Router,private af:AngularFire) {
    this.createPoll = new FormGroup({
      'title':new FormControl('', Validators.required),
      'desc':new FormControl(),
      'option1':new FormControl('', Validators.required),
      'option2':new FormControl('', Validators.required),
      'option3':new FormControl(),
    });
    this.id = this.dataService.pollId;
    this.id.subscribe(data => {
      this.receivedId = data.id;
      this.receivedId++;
      console.log(this.receivedId-1);
    });

        this.profileImg = _authService.profileImg;
        this.userName = _authService.userName;


  }
  onSubmit() {
    this.dataService.createpoll(this.createPoll.value, this.receivedId);
    this.titleemp ='';
    this.descemp ='';
    this.op1emp ='';
    this.op2emp ='';
    this.op3emp ='';
   // this.router.navigateByUrl('/polls');
    jQuery("#snackbar__pollCreate").addClass("show");
    setTimeout(()=>{jQuery("#snackbar__pollCreate").removeClass("show");},3000)
  }

  ngOnInit(){

    //var user = firebase.auth().currentUser;


    // if (user != null) {
    //   user.providerData.forEach(function (profile) {
    //     console.log("Sign-in provider: "+profile.providerId);
    //     console.log("  Provider-specific UID: "+profile.uid);
    //     console.log("  Name: "+profile.displayName);
    //     console.log("  Email: "+profile.email);
    //     console.log("  Photo URL: "+profile.photoURL);
    //   });
    }



}
