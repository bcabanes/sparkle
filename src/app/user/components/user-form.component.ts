import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// app
import { User } from '../user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  @Input() user: User = {} as User;

  @Output() submitted: EventEmitter<User> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.userForm = this.createUserForm();
  }

  private createUserForm(): FormGroup {
    return this.formBuilder.group({
      displayName   : [ this.user.displayName, [ Validators.required ] ],
      email   : [ this.user.email, [ Validators.required ] ],
      photoURL   : [ this.user.photoURL ],
      phoneNumber   : [ this.user.phoneNumber ]
    });
  }

  submit() {
    const user = new User({
      ...this.user,
      displayName: this.userForm.value.displayName,
      email: this.userForm.value.email,
      photoURL: this.userForm.value.photoURL,
      phoneNumber: this.userForm.value.phoneNumber,
    });
    this.submitted.emit(user);
  }
}
