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
  private cardPath = 'cards';

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
  }

  public createCard(card: ICard): Observable<ICard> {
    const path = `${this.afAuth.auth.currentUser.uid}/${this.cardPath}/`;
    return Observable.fromPromise(this.db.list(path).push(card)
      .then(data => ({ ...card, uid: data.key } as ICard)));
  }

  public getCardList(deckUid: string): Observable<ICard[]> {
    const path = `${this.afAuth.auth.currentUser.uid}/${this.cardPath}/`;
    return this.db.list(path, {
      query: {
        orderByChild: 'deckUid',
        equalTo: deckUid
      }
    }).first();
  }

  public getCard(cardUid: string): Observable<ICard> {
    const path = `${this.afAuth.auth.currentUser.uid}/${this.cardPath}/${cardUid}`;
    return this.db.object(path).first();
  }

  public updateCard(card: ICard): Observable<ICard> {
    const path = `${this.afAuth.auth.currentUser.uid}/${this.cardPath}/${card.uid}`;
    return Observable.fromPromise(this.db.object(path)
      .update({ title: card.title, content: card.content })
      .then(() => ({ ...card } as ICard)));
  }

  public deleteCard(cardUid: string): Observable<void> {
    const path = `${this.afAuth.auth.currentUser.uid}/${this.cardPath}`;
    return Observable.fromPromise(this.db.list(path).remove(cardUid));
  }
}
