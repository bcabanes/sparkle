import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  FirebaseListObservable,
  FirebaseObjectObservable
} from 'angularfire2/database';
import * as firebase from 'firebase';
import { IDeck } from './deck.model';

@Injectable()
export class DeckService {

  constructor(private db: AngularFireDatabase) {
  }

  public createDeck(params: { deck: IDeck, userUid: string }): any {
    return this.db.list(`${params.userUid}/decks/`).push(params.deck)
      .then(data => {
        return {
          ...params.deck,
          uid: data.key
        } as IDeck;
      });
  }

  public getDeckList(userUid: string): FirebaseListObservable<IDeck[]> {
    return this.db.list(`${userUid}/decks/`);
  }

  public getDeck(params: { deckUid: string, userUid: string }): FirebaseObjectObservable<IDeck> {
    return this.db.object(`${params.userUid}/decks/${params.deckUid}`);
  }

  public deleteDeck(params: { deckUid: string, userUid: string }): any {
    return this.db.list(`${params.userUid}/decks`).remove(params.deckUid);
  }
}
