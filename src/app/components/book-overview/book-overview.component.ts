import { Component, Input, OnInit } from '@angular/core';
import { Book } from '@/models/book';
import { faShoppingBasket, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '@/services/cart/cart.service';
import { AuthService } from '@/services/auth/auth.service';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.css']
})
export class BookOverviewComponent implements OnInit {
  @Input() book: Book;
  faShoppingBasket: IconDefinition = faShoppingBasket;
  loggedIn = false;
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.authService.checkUserData().subscribe(res => {
      this.loggedIn = res === true;
    })
  }

  ngOnInit(): void {
    this.authService.loggedInChange.subscribe(res => {
      this.loggedIn = res;
    })
  }

  addToCart(id: string): void {
    if (this.loggedIn) {
      this.cartService.addProductToCart(id);
    } else {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: { message: 'Please login to perform this process' }
      })
    }
  }

  showDetails(isbn: string) {
    if (this.loggedIn) {
      this.router.navigate([`/book/${isbn}`]);
    } else {
      this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: { message: 'Please login to perform this process' }
      })
    }
  }
}
