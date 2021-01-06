import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-number-indicator',
  templateUrl: './number-indicator.component.html',
  styleUrls: ['./number-indicator.component.css']
})
export class NumberIndicatorComponent implements OnInit {
  @Input() value: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
