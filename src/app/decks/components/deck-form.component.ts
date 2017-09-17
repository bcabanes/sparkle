import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// app
import { Deck } from '../deck.model';

@Component({
  selector   : 'app-deck-form',
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
      title    : [ '', [ Validators.required ] ],
      frequency: [ 4, [ Validators.required, Validators.pattern(/[0-9]*/) ] ],
      days     : [ 4, [ Validators.required, Validators.pattern(/[0-9]*/) ] ],
      startTime: [ 8, [ Validators.required, Validators.pattern(/[0-9]*/) ] ],
      endTime  : [ 8, [ Validators.required, Validators.pattern(/[0-9]*/) ] ]
    });
  }

  submit() {
    const deck = new Deck({
      ...this.deck,
      title    : this.deckForm.value.title,
      frequency: this.deckForm.value.frequency,
      days     : this.deckForm.value.days,
      startTime: this.deckForm.value.startTime,
      endTime  : this.deckForm.value.endTime
    });
    this.submitted.emit(deck);
  }
}
