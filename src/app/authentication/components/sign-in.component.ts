import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
// app
import { IAppState } from '../../ngrx/app.action';
import { UserActions } from '../../user/ngrx/user.action';

@Component({
  selector   : 'app-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public router: Router,
              private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.createSignInForm();
  }

  private createSignInForm() {
    this.signInForm = this.formBuilder.group({
      email   : [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ]
    });
  }

  public signIn() {
    this.store.dispatch(new UserActions.SignInEmailAction({
        email   : this.signInForm.value.email,
        password: this.signInForm.value.password
      }));
  }
}
