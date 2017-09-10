import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// app
import { ApiUrl } from '../core/tokens';
import { IDeck } from './deck.model';
import { firebaseObjectToArray } from '../shared/helpers';
import { CardService } from '../cards/card.service';
import { ICard } from '../cards/card.model';

@Injectable()
export class DeckService {
  private deckPath = 'decks';

  constructor(@Inject(ApiUrl) private apiUrl: string,
              private afAuth: AngularFireAuth,
              private cardService: CardService,
              private http: HttpClient) {
  }

  public createDeck(deck: IDeck): Observable<IDeck> {
    const url = `${this.apiUrl}/${this.afAuth.auth.currentUser.uid}/${this.deckPath}.json`;
    return this.http.post(url, deck)
      .map((data: { name: string }) => ({ ...deck, uid: data.name }));
  }

  public getDeckList(): Observable<IDeck[]> {
    const url = `${this.apiUrl}/${this.afAuth.auth.currentUser.uid}/${this.deckPath}.json`;
    return this.http.get(url).map((data: any) => firebaseObjectToArray(data));
  }

  public getDeck(deckUid: string): Observable<IDeck> {
    const url = `${this.apiUrl}/${this.afAuth.auth.currentUser.uid}/${this.deckPath}/${deckUid}.json`;
    return this.http.get(url).map((data: any) => ({ ...data, uid: deckUid }));
  }

  public updateDeck(deck: IDeck): Observable<IDeck> {
    const url = `${this.apiUrl}/${this.afAuth.auth.currentUser.uid}/${this.deckPath}/${deck.uid}.json`;
    return this.http.put(url, deck).map((data: any) => ({ ...data, uid: deck.uid }));
  }

  public deleteDeck(deckUid: string): Observable<any> {
    return this.cardService.getCardList(deckUid)
      .map((cardList: ICard[]) => cardList.forEach(card => this.cardService.deleteCard(card.uid)))
      .switchMap(() => {
        const url = `${this.apiUrl}/${this.afAuth.auth.currentUser.uid}/${this.deckPath}/${deckUid}.json`;
        return this.http.delete(url);
      });
  }
}
