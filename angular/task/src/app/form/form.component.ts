import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import {  Output, ViewChild, EventEmitter } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { ExitAboutGuard } from '../modele/guard/exitGuard';

export interface Team {
  id: string;
  title: string;
  content: { id: string; subTitle: string; text: string }[];
  img: any;
  author: string | null;
  date: string;
  tags: { tag: string }[];
}


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  tags$: Observable<any[]>;
  productsRef: AngularFirestoreCollection<any>;

  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private ExitAboutGuard: ExitAboutGuard
  ) {
    this.tags$ = firestore.collection('teg').valueChanges();
    this.productsRef = this.firestore.collection('angul');
  }

  @Output() submitEmitter = new EventEmitter<any>();

  @ViewChild(NgForm) form!: NgForm;
  tags: { tag: string }[] = [];
  model: Team = {
    id: Date.now().toString(),
    title: '',
    content: [{ id: '', subTitle: '', text: '' }],
    img: '',
    date: this.join(),
    author: localStorage.getItem('user.displayName'),
    tags: this.tags,
  };

  addteg(event: any) {
    let bool = true;
    this.tags.forEach((element) => {
      if (element.tag == event.target.innerText) {
        bool = !bool;
        this.tags = this.tags.filter((n) => n.tag !== event.target.innerText);
      }
    });
    if (bool) {
      this.tags.push({ tag: event.target.innerText });
      this.tags = this.tags.filter((n) => n.tag);
    }
  }

  join(
    t = new Date(),
    a = [{ month: 'short' }, { day: 'numeric' }, { year: 'numeric' }],
    s = ' '
  ) {
    function format(m: any) {
      let f = new Intl.DateTimeFormat('en', m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }

  url: string | null | ArrayBuffer | undefined;
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.url = event.target?.result;
        this.model.img = event.target?.result;
      };
    }
  }

  remodeImg() {
    this.url = '';
    this.model.img = '';
  }

  addClicked() {
    this.model.content.push({
      id: Date.now().toString(),
      subTitle: '',
      text: '',
    });
  }

  submit() {
    if (this.form.valid) {
      this.submitEmitter.emit(this.model);
      this.productsRef
        .doc(Date.now().toString())
        .set({ articlrList: this.model });
      this.router.navigateByUrl('');
    } else {
      this.form.form.markAllAsTouched();
    }
  }

  ngOnInit() {
    this.router.events.subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
      }
      if (routerEvent instanceof NavigationStart) {
        if (this.form.dirty) {
          this.ExitAboutGuard.foo();
        }
      }
    });
  }
}

