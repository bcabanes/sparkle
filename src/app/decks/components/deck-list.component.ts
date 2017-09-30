import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDeck } from '../deck.model';

@Component({
  selector: 'app-deck-list',
  template: `
    <md-list>
      <md-list-item *ngFor="let deck of deckList">
        <md-icon md-list-icon>note</md-icon>
        <h4 md-line>{{deck.title}}</h4>
        <a md-button [routerLink]="[ '/viewer', deck.uid ]">view</a>
        <a md-button [routerLink]="[ '/manage', 'decks', deck.uid ]">manage</a>
        <button (click)="onDelete.emit(deck.uid)" md-button>delete</button>
      </md-list-item>
    </md-list>
  `
})
export class DeckListComponent {
  @Input() deckList: IDeck[] = [];

  @Output() onDelete: EventEmitter<string> = new EventEmitter();
}
