import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FacebookModule } from 'ngx-facebook';


import { AppComponent } from './app.component';
import {AngularFireModule} from "angularfire2";
import { PollsComponent } from './polls/polls.component';
import {DataService} from "./data.service";
import {Routes, RouterModule} from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth/auth.component';
import {AuthGuardService} from "./auth-guard.service";
import {AuthService} from "./auth.service";
import {PreloaderService} from "./preloader.service";


//import { SimpleNotificationsModule,NotificationsService } from 'angular2-notifications';
//import {BrowserAnimationModule} from '@angular/platform-browser-dynamic/anima';
//import { A} from '@angular/animations';
const routes:Routes=[
  {path:'',canActivate: [AuthGuardService], component:AuthComponent},
  {path:'polls', component:PollsComponent},

  {path:'admin', component:AdminComponent},
  {path:'auth', component:AuthComponent},


]
export const firebaseConfig = {

// Initialize Firebase

  apiKey: "AIzaSyA3HBXc88_qzuCXf9zGsWL8jRP7MRobPNI",
  authDomain: "polling-app-1cb6f.firebaseapp.com",
  databaseURL: "https://polling-app-1cb6f.firebaseio.com",
  projectId: "polling-app-1cb6f",
  storageBucket: "polling-app-1cb6f.appspot.com",
  messagingSenderId: "721552437005"
};

@NgModule({
  declarations: [
    AppComponent,
    PollsComponent,
    AdminComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    //SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FacebookModule.forRoot()


  ],
  exports:[RouterModule],
  providers: [DataService,AuthGuardService,AuthService,PreloaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
