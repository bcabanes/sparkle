import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// app
import { IAppState } from '../../ngrx/app.action';
import { UserActions } from '../../user/ngrx/user.action';

@Component({
  selector   : 'app-sign-up',
  templateUrl: 'sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.createSignUpForm();
  }

  private createSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      email   : [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required, Validators.minLength(6) ] ],
      terms: [ false, [ Validators.required ] ]
    });
  }

  public signUp() {
    this.store.dispatch(new UserActions.SignUpAction({
      email   : this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }));
  }
}
