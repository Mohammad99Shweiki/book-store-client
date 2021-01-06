import {Component, HostListener, OnInit} from '@angular/core';
import {faArrowUp, IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent implements OnInit {
  faArrowUp: IconDefinition = faArrowUp;
  scrollOpacity: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const offset: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight: number = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.scrollOpacity = offset > windowHeight * 0.7 ? 1 : 0;
  }

  scrollTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
