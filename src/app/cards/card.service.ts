import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
// app
import { ICard } from './card.model';

@Injectable()
export class CardService {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
  }

  public createCard(card: ICard): any {
    const userUid = this.afAuth.auth.currentUser.uid;
    return this.db.list(`${userUid}/cards/`).push(card)
      .then(data => {
        return {
          ...card,
          uid: data.key
        } as ICard;
      });
  }

  public getCardList(deckUid: string): FirebaseListObservable<ICard[]> {
    const userUid = this.afAuth.auth.currentUser.uid;
    return this.db.list(`${userUid}/cards/`);
  }

  public getCard(cardUid: string): FirebaseObjectObservable<ICard> {
    const userUid = this.afAuth.auth.currentUser.uid;
    return this.db.object(`${userUid}/cards/${cardUid}`);
  }

  public deleteCard(cardUid: string): any {
    const userUid = this.afAuth.auth.currentUser.uid;
    return this.db.list(`${userUid}/cards`).remove(cardUid);
  }
}
