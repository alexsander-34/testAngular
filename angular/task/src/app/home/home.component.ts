import { Component, OnInit } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Pipe, PipeTransform } from '@angular/core';
import { Firebase1 } from '../serves/firebase';

interface Title {
  articlrList: {
    id: number;
    title: string;
    content: { subTitle: string; text: string }[];

    img: string;
    tags: { tag: string }[];
    author: string;
    date: string;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  searchText: string = '';

  tagonList: { tag: string }[] = [];

  title = 'task';

  item$: Observable<any[]>;
  tags$: Observable<any[]>;
  constructor(
    private firestore: AngularFirestore,
    private firebase: Firebase1
  ) {
    this.item$ = this.firebase.firestoreItem(this.searchText, this.tagonList);

    this.tags$ = firestore.collection('teg').valueChanges();
  }

  ngOnInit() {}
  fff() {
    this.item$ = this.firebase.firestoreItem(this.searchText, this.tagonList);
  }
  chengeTeg(event: any) {
    let bool = true;
    this.tagonList.forEach((element) => {
      if (element.tag == event.target.innerText) {
        bool = !bool;
        this.tagonList = this.tagonList.filter(
          (n) => n.tag !== event.target.innerText
        );
      }
    });
    if (bool) {
      this.tagonList.push({ tag: event.target.innerText });
      this.tagonList = this.tagonList.filter((n) => n.tag);
    }
    this.item$ = this.firebase.firestoreItem(this.searchText, this.tagonList);
  }
}

@Pipe({
  name: 'nameFilter',
})
export class NameFilterPipe implements PipeTransform {
  transform(
    values: Title[] | null,
    key: string,
    tag: { tag: string }[]
  ): Title[] | null {
    let data: Title[] | null = values;

    return data;
  }
}
