import { Component, OnInit } from '@angular/core';
import { CartService } from '@/services/cart/cart.service';
import { Cart } from '@/models/cart';
import { UserService } from '@/services/user/user.service';
import { UserData } from '@/models/userData';
import { BooksService } from '@/services/books/books.service';
import { OrderService } from '@/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { CartItem } from '@/models/cart-item';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmOrderDialogComponent } from '../confirm-order-dialog/confirm-order-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  userData: UserData;
  loggedIn: boolean = true;
  cartItems: CartItem[];
  booksLoaded: boolean = true;
  cartValue: number = 0;
  onGoingRequest: boolean = false;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private booksService: BooksService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private title: Title,
    private dialog: MatDialog
  ) {
    this.checkIfLoggedIn();
  }

  ngOnInit(): void {
    this.title.setTitle('Cart - BookStore');
    this.cartService.getUserCart().subscribe(res => {
      console.log(res);
      this.cartItems = Object.entries(res.items).map(item => {
        //@ts-ignore
        return { isbn: item[0], ...item[1] };
      })
      console.log(this.cartItems)
    });
    // this.checkIfLoggedIn();
    // this.getBooksInfo();
  }

  checkIfLoggedIn(): void {
    this.userService.getUserData().subscribe((val: UserData) => {
      if (val.userId) {
        this.loggedIn = true;
      }
    });
  }

  // getBooksInfo(): void {
  //   const booksIds: Set<string> = new Set();
  //   this.cart.items.forEach((product: { id: string, qty: number }) => {
  //     booksIds.add(product.id);
  //   });
  //   if (booksIds.size) {
  //     this.booksService.getBooksByIds(Array.from(booksIds)).subscribe((books: Array<Book>) => {
  //       this.cartItems = books;
  //       this.booksLoaded = true;
  //       this.setCartValue();
  //     });
  //   } else {
  //     this.booksLoaded = true;
  //   }
  // }

  // getBookById(id: string): Book {
  //   return this.cartItems.find((val: Book) => val.isbn === id);
  // }

  // setCartValue(): void {
  //   this.cartValue = this.cart.items.reduce((acc: number, product: { id: string, qty: number }) => {
  //     return acc + (this.getBookById(product.id).price ?? this.getBookById(product.id).price) * product.qty * 100;
  //   }, 0) / 100;
  // }

  editProductInCart(productUpdate: { id: string, qty: number, type: 'update' | 'delete' }): void {
    if (productUpdate.type === 'update') {
      this.cartService.modifyProductInCart(productUpdate.id, productUpdate.qty);
      this.cart = this.cartService.getCart();
    } else if (productUpdate.type === 'delete') {
      this.cartService.removeProductFromCart(productUpdate.id);
    }
    // this.setCartValue();
  }

  placeOrder(): void {
    const dialogRef = this.dialog.open(ConfirmOrderDialogComponent, {
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(res => {
      const { address, phoneNo } = res;
      this.orderService.placeOrder(address, phoneNo).subscribe({
        next: () => {
          this.toastr.success('Your order was correctly placed, thank you');
        },
        error: () => {
          this.toastr.error('Something went wrong');
        }
      })
    });
  }
}
