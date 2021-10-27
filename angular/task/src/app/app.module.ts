import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{HeaderComponent}from './modele/header/header.component';
import { Routes,RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { AuthComponent } from './auth/auth.component';
import { ArticleAuthorizedComponent } from './article-authorized/article-authorized.component';
import{NameFilterPipe}from './home/home.component';
import { FooterComponent } from './modele/footer/footer.component';
import { Article } from './article-authorized/article-authorized.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


import { ExitAboutGuard } from './modele/guard/exitGuard';
import { Firebase1 } from './serves/firebase';
import { ReactiveFormsModule } from '@angular/forms';





const appRoures:Routes=[
  {path:'',component:HomeComponent},
  {path:'form',component:FormComponent,canDeactivate:[ExitAboutGuard]
},
  {path:'auth',component:AuthComponent},
  {path:'articleAuthorized/:id',component:ArticleAuthorizedComponent
},

]




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArticleAuthorizedComponent,
    AuthComponent,
    FormComponent,
    HomeComponent,
    NameFilterPipe,
    Article,
    
   

  
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule ,
    AppRoutingModule,
    RouterModule.forRoot(appRoures),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAL7BZYCpW3uTVlOjm_RzHx2Va3KlZQUeg",
      authDomain: "curs-df320.firebaseapp.com",
      projectId: "curs-df320",
      storageBucket: "curs-df320.appspot.com",
      messagingSenderId: "433364064566",
      appId: "1:433364064566:web:e37efa513d0fd23b0a7b97"
  },
   
  ),
  AngularFirestoreModule
  ],
  providers: [ExitAboutGuard,Firebase1],
  bootstrap: [AppComponent]
})
export class AppModule { }
