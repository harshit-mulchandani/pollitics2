import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable} from "angularfire2";
import * as moment from 'moment';
@Injectable()
export class DataService {
  public pollId: FirebaseObjectObservable<any>;
  public pollData: FirebaseObjectObservable<any>;
  public userData: FirebaseObjectObservable<any>;
  date = new Date();
  public trimmedemail:any;
  year: any;
  month: any;
  day: any;
  formattedDate: any;
  constructor(public af: AngularFire) {
    this.pollId = this.af.database.object('pollId');
    this.pollData = this.af.database.object('pollData');
    this.userData = this.af.database.object('registeredUsers');


  }
  public pollTitle: any;
  public pollDesc: any;
  public option1: any;
  public option2: any;
  public option3: any;
  createpoll(polldata, receivedId) {
    this.pollTitle = polldata.title;
    this.pollDesc = polldata.desc;
    this.option1 = polldata.option1;
    this.option2 = polldata.option2;
    this.option3 = polldata.option3;
    this.formattedDate = moment();
    this.formattedDate = moment(this.formattedDate).format('MMM DD YYYY');
    // const arr1: any[] = [this.option1, 0];
    // const arr2: any[] = [this.option2, 0];
    // const arr3: any[] = [this.option3, 0];
    const message = {
      id: receivedId
    };
    const message2 = {
      [receivedId]: {
        title: this.pollTitle,
        desc: this.pollDesc,
        option1: this.option1,
        option2: this.option2,
        option3: this.option3,
        option1val: 0,
        option2val: 0,
        option3val: 0,
        pollID: receivedId,
        date: this.formattedDate}
    };
    this.pollId.update(message);
    this.pollData.update(message2);
  };
  // voteop1(value, value2) {
  //   const updates = {};
  //   updates['/' + value2 + '/option1val'] = value;
  //   this.pollData.update(updates);
  // }
  // voteop2(value, value2) {
  //   const updates = {};
  //   updates['/' + value2 + '/option2val'] = value;
  //   this.pollData.update(updates);
  // }
  // voteop3(value, value2) {
  //   const updates = {};
  //   updates['/' + value2 + '/option3val'] = value;
  //   this.pollData.update(updates);
  // }

  voteop1(value, value2) {
    this.af.database.object('pollData/' + value2 + '').update({
      option1val : value
    });
  }
  voteop2(value, value2) {
    this.af.database.object('pollData/' + value2 + '').update({
      option2val : value
    });
  }
  voteop3(value, value2) {
    this.af.database.object('pollData/' + value2 + '').update({
      option3val : value
    });
  }
  storeVote1(pollid, email) {
    this.trimmedemail = email.split('.');
    this.af.database.object('registeredUsers/' + this.trimmedemail[0] + '/' + pollid + '').update({
      option : 1,
      pollId: pollid
    });
  }
  storeVote2(pollid, email) {
    this.trimmedemail = email.split('.');
    this.af.database.object('registeredUsers/' + this.trimmedemail[0] + '/' + pollid + '').update({
      option : 2,
      pollId: pollid
    });
  }
  storeVote3(pollid, email) {
    this.trimmedemail = email.split('.');
    this.af.database.object('registeredUsers/' + this.trimmedemail[0] + '/' + pollid + '').update({
      option : 3,
      pollId: pollid
    });
  }





}
