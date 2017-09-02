import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import * as firebase from 'firebase';
import { IDeck } from './deck.model';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class DeckService {

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {
  }

  public createDeck(deck: IDeck): any {
    return this.db.list(`${this.afAuth.auth.currentUser.uid}/decks/`).push(deck)
      .then(data => {
        return {
          ...deck,
          uid: data.key
        } as IDeck;
      });
  }

  public getDeckList(): FirebaseListObservable<IDeck[]> {
    return this.db.list(`${this.afAuth.auth.currentUser.uid}/decks/`);
  }

  public getDeck(deckUid: string): FirebaseObjectObservable<IDeck> {
    return this.db.object(`${this.afAuth.auth.currentUser.uid}/decks/${deckUid}`);
  }

  public deleteDeck(deckUid: string): any {
    return this.db.list(`${this.afAuth.auth.currentUser.uid}/decks`).remove(deckUid);
  }
}
