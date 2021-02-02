import {Component, HostListener, Input, OnInit} from '@angular/core';
import {faArrowUp, IconDefinition} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.css']
})
export class ScrollTopComponent implements OnInit {
  @Input() footerHeight: number;
  faArrowUp: IconDefinition = faArrowUp;
  scrollOpacity: number = 0;
  bottomPosition: number = 40;

  constructor() {
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const offset: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight: number = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.scrollOpacity = offset > windowHeight * 0.7 ? 1 : 0;
    this.setUpBottomPosition();
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    this.setUpBottomPosition();
  }

  setUpBottomPosition(): void {
    const offset: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const documentHeight: number = document.documentElement.scrollHeight;
    const windowHeight: number = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.bottomPosition = documentHeight - offset - windowHeight < this.footerHeight ?
      ((documentHeight - offset - windowHeight - this.footerHeight) * - 1) + 40 : 40;
  }

  scrollTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
