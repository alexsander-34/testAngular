import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, validateEventsArray } from '@angular/fire/firestore';
import { Observable, pipe, from } from 'rxjs'
import { tap, map, filter, pluck } from 'rxjs/operators';
import { HomeComponent } from '../home/home.component'




interface Title {
    articlrList: {
        id: number,
        title: string,
        content: { subTitle: string, text: string }[],


        img: string,
        tags: { tag: string }[],
        author: string,
        date: string
    }
}
@Injectable()

export class Firebase1 {

    // item1$: Observable<any[]>;
    tags$: BehaviorSubject<any[]>;
    item1$: Observable<any[]>;

    // fot =new BehaviorSubject<Title[]>




    constructor(private firestore: AngularFirestore) {
       
    }

    firestoreItem(str: string='', tagsOn: { tag: string }[]=[]) {
        console.log(str)

        this.item1$ =
            this.firestore.collection('angul'
            // , ref => ref.where('articlrList.title', '>', str  )
            )
                .valueChanges().pipe(
                    
                        map(val => val.filter((v: any) => {
                            let boll = false; v.articlrList.tags.forEach((element: any) => {
                                tagsOn.forEach((vll) => {
                                    if (element.tag == vll.tag) {
                                        boll = !boll

                                    }
                                })
                            }); if (boll || !tagsOn[0]) {return true} else { return false }
                        })),
                        map((val)=>val.filter((vale:any) => vale.articlrList.title.toLowerCase().includes(str.toLowerCase())))

                    
                )

        return this.item1$


    }


    

}