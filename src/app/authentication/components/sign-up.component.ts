import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector   : 'app-sign-up',
  templateUrl: 'sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public router: Router) {
  }

  ngOnInit() {
    this.createSignUpForm();
  }

  private createSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      email   : [ '', Validators.required, Validators.email ],
      password: [ '', Validators.required, Validators.minLength(6) ]
    });
  }

  public signUp() {
    // this.store.dispatch();
  }
}
