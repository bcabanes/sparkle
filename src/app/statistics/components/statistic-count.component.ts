import { Component, Input } from '@angular/core';

@Component({
  selector : 'app-statistic-count',
  template : `
    <md-card class="statistic-count" [ngClass]="color">
      <div class="icon">{{icon}}</div><!-- /.icon -->
      <div class="description">
        <strong>{{value}}</strong> {{entity}}
        <small>{{action}}.</small>
      </div>
    </md-card>
  `,
  styleUrls: [ './statistic-count.component.scss' ]
})
export class StatisticCountComponent {
  @Input() color: 'indigo' | 'blue' | 'green' = 'indigo';
  @Input() icon: string;
  @Input() entity: string;
  @Input() action: string;
  @Input() value: number;
}
