import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
// app
import { Deck } from '../deck.model';
import { IAppState } from '../../ngrx/app.action';
import { DeckActions } from '../ngrx/deck.action';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html'
})
export class DeckFormComponent implements OnInit {
  deckForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private store: Store<IAppState>) {
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
    const deck = new Deck({ title: this.deckForm.value.title });
    this.store.dispatch(new DeckActions.CreateDeckAction(deck.serialize()));
  }
}
