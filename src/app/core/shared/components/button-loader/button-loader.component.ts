import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'button-loader',
  template: `
    <button type="submit" [disabled]="disable" [class]="class?class:'btn btn-primary shadow-1 font-13 fw-600 lh-22 py-2 px-md-4 px-3'" [disabled]="loader" [ngClass]="{'disable':loader}">
      <ng-container *ngIf="loader">
        <i class="fas fa-sync-alt fa-spin"></i>
      </ng-container>
      {{text}}
    </button>
    `,
  styles: [`.disable{opacity:0.6;pointer-events:none;}`]
})

export class DietrecipieComponent implements OnInit {

  @Input() class: string | undefined;
  @Input() loader: boolean;
  @Input() text: string | undefined;
  @Input() disable:boolean = false;

  ngOnInit(): void { }

}