import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() color: string;
  constructor() { }

  ngOnInit(): void {
  }

  getBorderColors(): object {
    return {
      border: `1em solid ${this.color}33`,
      borderLeftColor: this.color
    };
  }

}
