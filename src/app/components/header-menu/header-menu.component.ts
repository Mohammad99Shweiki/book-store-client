import {Component, HostListener, OnInit} from '@angular/core';
import {faBars, faShoppingBasket, faUser, faTimes, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {NavService} from '../../services/nav.service';
import {NavigationStart, Router, RouterEvent} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  height: number = 100;
  faShoppingBasket: IconDefinition = faShoppingBasket;
  faUser: IconDefinition = faUser;
  sidebarOpened: boolean = false;
  navTransformString: string = '';
  menuIcon: IconDefinition = faBars;
  basketCounter: number = 5;
  constructor(private navService: NavService, private router: Router) {
  }

  ngOnInit(): void {
    this.subscribeTouRouting();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const offset: number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.height = offset - this.height > 20 ? 80 : 100;
  }

  toggleMenu(): void {
    this.sidebarOpened = !this.sidebarOpened;
    this.menuIcon = this.sidebarOpened ? faTimes : faBars;
    this.navTransformString = this.sidebarOpened ? 'translateX(-300px)' : '';
    this.navService.changeSidebarStatus(this.sidebarOpened);
  }

  subscribeTouRouting(): void {
    this.router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationStart)).subscribe(() => {
      if (this.sidebarOpened) {
        this.toggleMenu();
      }
    });
  }
}
