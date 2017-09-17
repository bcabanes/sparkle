import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/operator/first';
import 'rxjs/operator/map';
// app
import { IDeck } from './deck.model';
import { CardService } from '../cards/card.service';
import { ICard } from '../cards/card.model';

@Injectable()
export class DeckService {
  private deckPath = 'decks';

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private cardService: CardService) {
  }

  public createDeck(deck: IDeck): Observable<IDeck> {
    const path = `${this.afAuth.auth.currentUser.uid}/${this.deckPath}`;
    return Observable.fromPromise(this.db.list(path).push(deck)
      .then(data => ({ ...deck, uid: data.key } as IDeck)));
  }

  public getDeckList(): Observable<IDeck[]> {
    const path = `${this.afAuth.auth.currentUser.uid}/${this.deckPath}`;
    return this.db.list(path).first();
  }

  public getDeck(deckUid: string): Observable<IDeck> {
    const path = `${this.afAuth.auth.currentUser.uid}/${this.deckPath}/${deckUid}`;
    return this.db.object(path).first();
  }

  public updateDeck(deck: IDeck): Observable<void> {
    const path = `${this.afAuth.auth.currentUser.uid}/${this.deckPath}/${deck.uid}`;
    return Observable.fromPromise(this.db.object(path).update({ title: deck.title })
      .then(() => ({ ...deck } as IDeck)));
  }

  public deleteDeck(deckUid: string): Observable<void> {
    return this.cardService.getCardList(deckUid)
      .map((cardList: ICard[]) => cardList.forEach(card => this.cardService.deleteCard(card.uid)))
      .switchMap(() => {
        const path = `${this.afAuth.auth.currentUser.uid}/${this.deckPath}`;
        return Observable.fromPromise(this.db.list(path).remove(deckUid));
      });
  }

  public getAnswerableDeckList(): Observable<IDeck[]> {
    const path = `${this.afAuth.auth.currentUser.uid}/${this.deckPath}`;
    return this.db.list(path, {
      query: {
        orderByChild: 'isActive',
        equalTo     : true
      }
    })
      .map((deckList: IDeck[]) => deckList.filter(this.isDeckAnswerable))
      .first();
  }

  private isDeckAnswerable(deck: IDeck): boolean {
    const hoursIndicator: number = new Date().getHours();
    if (deck.startTime < hoursIndicator && hoursIndicator < deck.endTime) {
      const now: number = Date.now();
      const timeSinceLastAnswer: number = ((now - deck.lastAnswered) / (1000 * 60 * 60)) % 24;
      if (timeSinceLastAnswer > deck.ratio) {
        console.log('should ask', timeSinceLastAnswer, deck.ratio);
        return true;
      } else {
        console.log('should not ask, ratio exceeded', timeSinceLastAnswer, deck);
      }
    } else {
      console.log('should not ask, interval exceeded', deck);
    }
    return false;
  }
}
