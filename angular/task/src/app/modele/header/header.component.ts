
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';



@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    img: string = '/src/assets/1.png'

    login: boolean = false
    constructor(public auth: AngularFireAuth, private router: Router) {

    }



    logout() {
        localStorage.removeItem('user.displayName')
        localStorage.removeItem('user.photoURL')
        this.auth.signOut();
        this.router.navigateByUrl('');
    }

    ngOnInit(): void {


        if (localStorage.getItem("user.displayName")) {

            this.login = !this.login

        }


    }

}