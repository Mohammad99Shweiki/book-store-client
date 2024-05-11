import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  sidebarOpened: boolean = false;
  @ViewChild('footer') footer: ElementRef;
  footerHeight: number;

  constructor(private ref: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.ref.detectChanges();
  }
}
