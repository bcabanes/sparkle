import { Injectable } from '@angular/core';
import {
  AngularFireDatabase
} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/first';
// app
import { ICard } from './card.model';

@Injectable()
export class CardService {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
  }

  public createCard(card: ICard): Observable<ICard> {
    const userUid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(this.db.list(`${userUid}/cards/`).push(card)
      .then(data => {
        return {
          ...card,
          uid: data.key
        } as ICard;
      }));
  }

  public getCardList(deckUid: string): Observable<ICard[]> {
    const userUid = this.afAuth.auth.currentUser.uid;
    return this.db.list(`${userUid}/cards/`, {
      query: {
        orderByChild: 'deckUid',
        equalTo: deckUid
      }
    }).first();
  }

  public getCard(cardUid: string): Observable<ICard> {
    const userUid = this.afAuth.auth.currentUser.uid;
    return this.db.object(`${userUid}/cards/${cardUid}`).first();
  }

  public deleteCard(cardUid: string): Observable<void> {
    const userUid = this.afAuth.auth.currentUser.uid;
    return Observable.fromPromise(this.db.list(`${userUid}/cards`).remove(cardUid))
      .first();
  }
}
