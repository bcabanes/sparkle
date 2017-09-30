import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  template: `
    <img *ngIf="pictureUrl" 
         [src]="pictureUrl"
         class="profile-picture"
         alt="profile picture">
    <md-icon *ngIf="!pictureUrl" class="profile-icon">account_circle</md-icon>
  `,
  styles: [ `
    .profile-picture {
      border-radius: 50%;
      height: 36px;
      width: 36px;
    }
    
    .profile-icon { vertical-align: middle; }
    ` ]
})
export class ProfilePictureComponent {
  @Input() pictureUrl: string;
}
