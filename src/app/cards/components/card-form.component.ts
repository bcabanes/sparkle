import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// app
import { Card } from '../card.model';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html'
})
export class CardFormComponent implements OnInit {
  cardForm: FormGroup;

  @Input() card: Card = {} as Card;

  @Output() submitted: EventEmitter<Card> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.cardForm = this.createCardForm();
  }

  private createCardForm(): FormGroup {
    return this.formBuilder.group({
      title   : [ '', [ Validators.required ] ],
      content   : [ '', [ Validators.required ] ]
    });
  }

  submit() {
    const card = new Card({
      ...this.card,
      title: this.cardForm.value.title,
      content: this.cardForm.value.content
    });
    this.submitted.emit(card);
  }
}
