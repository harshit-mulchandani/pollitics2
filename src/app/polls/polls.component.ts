import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {FirebaseObjectObservable, AngularFire} from "angularfire2";
import Auth = firebase.auth.Auth;
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
declare var jQuery:any;
@Component({
  selector: 'app-polls',
  templateUrl: './polls.component.html',
  styleUrls: ['./polls.component.css']
})
export class PollsComponent implements OnInit {
  public allPolls: FirebaseObjectObservable<any>;
  public allPollData: any;
  public storeData: any[];
  public allPollStatus: any[];
  public allTempRegisteredUsers:any;
  public allRegisteredUsers:any[];
  public notVoted: any[];
  public voted: any[];
  public authemail:any;
  public index:any;
  isDataAvailable = false;
  isLoggedIn:any;
  userName:any;
  profileImg:any;
  public op1count: number;
  public op2count: number;
  public op3count: number;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    scaleShowHorizontalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 0,
          // Create scientific notation labels
        }
      }]
    }
  };
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  constructor(private dataService: DataService,private _authService:AuthService,private af:AngularFire,private router:Router) {
    this.allPolls = this.dataService.pollData;
    this.allPolls.subscribe(data => {
      this.allPollData = data;
      const obj = this.allPollData;
      const arr = [];
      for (const prop in obj) {
        arr.push(obj[prop]);
      }
      console.log(arr);
      this.storeData = arr;
    });

    this.af.auth.subscribe(
      (auth)=>{

        if(auth){
          this.isLoggedIn = true;
          this.authemail = auth.auth.email;
          console.log("Email",auth.auth.email);
        }
        else{this.isLoggedIn=false;}

      });
    this.dataService.userData.subscribe(data=>
    {
      this.allTempRegisteredUsers = data;
      const obj = this.allTempRegisteredUsers;
      const arr = [];
      for (const prop in obj) {
        arr.push(obj[prop]);
      }
      console.log(arr);
      this.allRegisteredUsers = arr;
      for (let i = 0; i < arr.length; i++) {
        if (this.allRegisteredUsers[i].email === this.authemail) {
          this.index = i;

          break;
        }
      }
      console.log(this.allRegisteredUsers[this.index]);
      const obj1 = this.allRegisteredUsers[this.index];
      const arr2 = [];
      for (const prop in obj1) {
        arr2.push(obj1[prop]);
      }
      console.log(arr2);
      const arr3 = [];
      for(let i =0;i<arr2.length-2;i++){
        arr3.push(arr2[i].pollId);
      }
      this.voted = arr3;
      console.log("userVoted",this.voted);
 //     console.log(this.displayName);
    //  this.isLoggedIn = true;

      const arr4 = [];
      const arr5 =[];
      for(let i =0; i < this.storeData.length; i++) {
        for(let j =0;j<this.voted.length;j++){
          if(this.storeData[i].pollID==this.voted[j]) {
            arr4[i]=true;

        }
        else{
            if(arr4[i]!=true){
              arr4[i]=false;
            }
          }
        }
      }
      let c = 0;
      console.log("c value"+c);
      for(let i =0; i < this.storeData.length; i++) {
        for (let j = 0; j < this.voted.length; j++) {
          if (this.storeData[i].pollID != this.voted[j]) {
            c++;
          }
          else if(this.storeData[i].pollID == this.voted[j]) {
            c=0;
            break;
          }
        }
        if(c == this.voted.length){
          arr5.push(this.storeData[i].pollID);
          c = 0;
        }
      }
      this.notVoted = arr5;
      console.log("notVoted",this.notVoted.length);
      this.allPollStatus=arr4;
      console.log(JSON.parse(JSON.stringify(this.allPollStatus)));
      // const arr4 = [];
      for(let i =0;i<this.storeData.length;i++){
        this.storeData[i].voteStatus = this.allPollStatus[i];
      }
      console.log(this.storeData);
      // this.allPollsIds = arr4;
      // console.log("Sare k sare poll Id : " + this.allPollsIds);
    });



    // this.userName = _authService.userName;
    // this.profileImg = _authService.profileImg;
    //
    // this.allVotes = this.dataService.pollOptions;
    // this.allVotes.subscribe(data => {
    //   this.allPollVote = data;
    //    const obj = this.allPollVote;
    //    const arr = [];
    //   for (const prop in obj) {
    //     arr.push(obj[prop]);
    //   }
    //   this.storeVote = arr;
   // });
    this.isDataAvailable = true;
  }
  vote1(event) {
    const id = event.target.id;
    let index=0;
    for(let i=0;i<this.storeData.length;i++){
      if(this.storeData[i].pollID==id){
        index=i;
        break;
      }
    }
    this.op1count = this.storeData[index].option1val;
    this.op1count++;
    this.dataService.voteop1(this.op1count, event.target.id);
    this.dataService.storeVote1(event.target.id, this.authemail);
    jQuery("#snackbar").html("<div>Your Vote has been recorded</div>");
    jQuery("#snackbar").addClass("show");
    //this.hide();
    setTimeout(() => { jQuery("#snackbar").removeClass("show"); }, 3000);
    jQuery("#card-text").removeClass("card-text");
    jQuery("#someID").empty();

  }
  vote2(event) {
    const id = event.target.id;
    let index=0;
    for(let i=0;i<this.storeData.length;i++){
      if(this.storeData[i].pollID==id){
        index=i;
        break;
      }
    }
    this.op2count = this.storeData[index].option2val;
    this.op2count++;
    this.dataService.voteop2(this.op2count, event.target.id);
    this.dataService.storeVote2(event.target.id, this.authemail);
    jQuery("#snackbar").html("<div>Your Vote has been recorded</div>");
    jQuery("#snackbar").addClass("show");
    setTimeout(() => { jQuery("#snackbar").removeClass("show"); }, 3000);
  }
  vote3(event) {

    const id = event.target.id;
    let index=0;
    for(let i=0;i<this.storeData.length;i++){
      if(this.storeData[i].pollID==id){
        index=i;
        break;
      }
    }
    this.op3count = this.storeData[index].option3val;
    this.op3count++;
    this.dataService.voteop3(this.op3count, event.target.id);
    this.dataService.storeVote3(event.target.id, this.authemail);
    jQuery("#snackbar").html("<div>Your Vote has been recorded</div>");
    jQuery("#snackbar").addClass("show");
    setTimeout(() => { jQuery("#snackbar").removeClass("show"); }, 3000);
  }
  ngOnInit() {
  }
  signInPopUp(){
    this.router.navigateByUrl('/auth');
    // jQuery("#snackbar").html("<div>You need to be logged In to vote.</div>");
    // jQuery("#snackbar").addClass("show");
    // setTimeout(()=>{jQuery("#snackbar").removeClass("show")},3000);
  }

}
