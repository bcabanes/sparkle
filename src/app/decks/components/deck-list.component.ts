import { Component, Input } from '@angular/core';
import { IDeck } from '../deck.model';

@Component({
  selector: 'app-deck-list',
  template: `
    <md-list>
      <h3 md-subheader>Deck list</h3>
      <md-list-item *ngFor="let deck of deckList">
        <md-icon md-list-icon>note</md-icon>
        <h4 md-line>{{deck.title}}</h4>
        <a md-button [routerLink]="[ '/manage', 'decks', deck.uid ]">manage</a>
      </md-list-item>
    </md-list>
  `
})
export class DeckListComponent {
  @Input() deckList: IDeck[] = [];
}
