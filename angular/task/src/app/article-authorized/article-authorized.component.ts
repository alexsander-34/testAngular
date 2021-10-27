import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

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
let id: any;
@Component({
  selector: 'app-article-authorized',
  templateUrl: './article-authorized.component.html',
  styleUrls: ['./article-authorized.component.scss'],
})
export class ArticleAuthorizedComponent implements OnInit {
  private routeSubscription: Subscription;
  item$: Observable<any[]>;
  id = null;
  object = Object;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {
    this.routeSubscription = route.params.subscribe(
      (params) => (id = params['id'])
    );
    this.item$ = firestore.collection('angul').valueChanges();
  }
  ngOnInit() {}
}
@Pipe({
  name: 'article',
})
export class Article implements PipeTransform {
  transform(values: Title[] | null): Title[] | null {
    let data: Title[] | null = values;
    if (values) data = values.filter((val) => val.articlrList.id == id);
    return data;
  }
}
