import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICard } from '../card.model';

@Component({
  selector: 'app-card-list',
  template: `
    <md-list>
      <h3 md-subheader>Card list</h3>
      <md-list-item *ngFor="let card of cardList">
        <md-icon md-list-icon>note</md-icon>
        <h4 md-line>{{card.title}}</h4>
        <a md-button [routerLink]="[ '/manage', 'cards', card.uid ]">manage</a>
        <button (click)="onDelete.emit(card.uid)" md-button>delete</button>
      </md-list-item>
    </md-list>
  `
})
export class CardListComponent {
  @Input() cardList: ICard[] = [];

  @Output() onDelete: EventEmitter<string> = new EventEmitter();
}
