import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {faBars, faShoppingBasket, faUser, faTimes, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';
import {CartService} from '../../services/cart/cart.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  @Input() navSidebarOpened: boolean;
  @Output() navSidebarOpenedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  height: number = 100;
  faShoppingBasket: IconDefinition = faShoppingBasket;
  faUser: IconDefinition = faUser;
  navTransformString: string = '';
  menuIcon: IconDefinition = faBars;
  basketCounter: number = 5;
  loggedIn: boolean = false;

  constructor(
    private router: Router, 
    private cartService: CartService,
    private authService: AuthService
  ) {
    this.authService.loggedInChange.subscribe(res => this.loggedIn = res)
  }

  ngOnInit(): void {
    this.subscribeTouRouting();
    this.subscribeToBasketCounter();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const offset: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.height = offset - this.height > 20 ? 80 : 100;
  }

  @HostListener('window:resize', [])
  onResize(): void {
    const windowWidth: number = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (windowWidth > 1200 && this.navSidebarOpened) {
      this.toggleMenu();
    }
  }

  toggleMenu(): void {
    this.navSidebarOpened = !this.navSidebarOpened;
    this.navSidebarOpenedChange.emit(this.navSidebarOpened);
    this.menuIcon = this.navSidebarOpened ? faTimes : faBars;
    this.navTransformString = this.navSidebarOpened ? 'translateX(-300px)' : '';
  }

  subscribeTouRouting(): void {
    this.router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationStart)).subscribe(() => {
      if (this.navSidebarOpened) {
        this.toggleMenu();
      }
    });
  }

  subscribeToBasketCounter(): void {
    this.basketCounter = this.cartService.cartLengthSource.getValue();
    this.cartService.cartLengthSource.subscribe((val: number) => {
      this.basketCounter = val;
    });
  }
}
