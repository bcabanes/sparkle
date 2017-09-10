import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// app
import { Deck } from '../deck.model';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html'
})
export class DeckFormComponent implements OnInit {
  deckForm: FormGroup;

  @Input() deck: Deck = {} as Deck;

  @Output() submitted: EventEmitter<Deck> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.deckForm = this.createDeckForm();
  }

  private createDeckForm(): FormGroup {
    return this.formBuilder.group({
      title   : [ '', [ Validators.required ] ],
    });
  }

  submit() {
    const deck = new Deck({ ...this.deck, title: this.deckForm.value.title });
    this.submitted.emit(deck);
  }
}
