import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-card',
  templateUrl: './status-card.component.html',
  styleUrls: ['./status-card.component.css']
})
export class StatusCardComponent implements OnInit {
  @Input() title!: string;
  @Input() color!: string;
  @Input() bgColor!: string;
  @Input() count!: number;
  constructor() { }

  ngOnInit() {
  }

}
