import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(public auth: AngularFireAuth, private router: Router) {}
  login() {
    this.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((value) => {
        if (value.user?.displayName) {
          localStorage.setItem('user.displayName', value.user?.displayName);
        }
        if (value.user?.photoURL) {
          localStorage.setItem('user.photoURL', value.user?.photoURL);
        }
        this.router.navigateByUrl('');
        console.log(this.auth.user);
      });
  }

  ngOnInit(): void {}
}
