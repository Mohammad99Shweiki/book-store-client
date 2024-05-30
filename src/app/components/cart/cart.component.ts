import { Component, OnInit } from '@angular/core';
import { CartService } from '@/services/cart/cart.service';
import { Cart } from '@/models/cart';
import { UserService } from '@/services/user/user.service';
import { UserData } from '@/models/userData';
import { Book } from '@/models/book';
import { BooksService } from '@/services/books/books.service';
import { OrderService } from '@/services/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  userData: UserData;
  loggedIn: boolean = true;
  books: Book[] = [{
    "isbn": "9780312965785",
    "title": "All Creatures Great and Small",
    "authors": [
      "James Herriot"
    ],
    "genres": [
      "Nonfiction",
      " Animals",
      " Memoir",
      " Classics",
      " Biography",
      " Humor",
      " Autobiography",
      " Biography Memoir",
      " British Literature",
      " Audiobook"
    ],
    "price": 2.0,
    "description": "The classic multimillion copy bestsellerDelve into the magical, unforgettable world of James Herriot, the world's most beloved veterinarian, and his menagerie of heartwarming, funny, and tragic animal patients.For over forty years, generations of readers have thrilled to Herriot's marvelous tales, deep love of life, and extraordinary storytelling abilities. For decades, Herriot roamed the remote, beautiful Yorkshire Dales, treating every patient that came his way from smallest to largest, and observing animals and humans alike with his keen, loving eye.In All Creatures Great and Small, we meet the young Herriot as he takes up his calling and discovers that the realities of veterinary practice in rural Yorkshire are very different from the sterile setting of veterinary school. Some visits are heart-wrenchingly difficult, such as one to an old man in the village whose very ill dog is his only friend and companion, some are lighthearted and fun, such as Herriot's periodic visits to the overfed and pampered Pekinese Tricki Woo who throws parties and has his own stationery, and yet others are inspirational and enlightening, such as Herriot's recollections of poor farmers who will scrape their meager earnings together to be able to get proper care for their working animals. From seeing to his patients in the depths of winter on the remotest homesteads to dealing with uncooperative owners and critically ill animals, Herriot discovers the wondrous variety and never-ending challenges of veterinary practice as his humor, compassion, and love of the animal world shine forth.James Herriot's memoirs have sold 80 million copies worldwide, and continue to delight and entertain readers of all ages",
    "publicationDate": "1998-04-15",
    "ratings": [],
    "awards": [
      ""
    ],
    "publisher": "St. Martin's Paperbacks",
    "language": "English",
    "pages": 437,
    "available": 10,
    "sold": 0,
    "imageLink": "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1393644607l/32085.jpg",
    "fileLink": null,
    "onSale": false,
    "salePrice": null
  },];
  booksLoaded: boolean = true;
  cartValue: number = 0;
  onGoingRequest: boolean = false;

  constructor(
    private cartService: CartService,
    private userService: UserService,
    private booksService: BooksService,
    private orderService: OrderService,
    private toastr: ToastrService,
    private title: Title
  ) {
    this.checkIfLoggedIn();
  }

  ngOnInit(): void {
    this.title.setTitle('Cart - BookStore');
    this.cartService.getUserCart().subscribe(res => {
      console.log(res)
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

  getBooksInfo(): void {
    const booksIds: Set<string> = new Set();
    this.cart.items.forEach((product: { id: string, qty: number }) => {
      booksIds.add(product.id);
    });
    if (booksIds.size) {
      this.booksService.getBooksByIds(Array.from(booksIds)).subscribe((books: Array<Book>) => {
        this.books = books;
        this.booksLoaded = true;
        this.setCartValue();
      });
    } else {
      this.booksLoaded = true;
    }
  }

  getBookById(id: string): Book {
    return this.books.find((val: Book) => val.isbn === id);
  }

  setCartValue(): void {
    this.cartValue = this.cart.items.reduce((acc: number, product: { id: string, qty: number }) => {
      return acc + (this.getBookById(product.id).price ?? this.getBookById(product.id).price) * product.qty * 100;
    }, 0) / 100;
  }

  editProductInCart(productUpdate: { id: string, qty: number, type: 'update' | 'delete' }): void {
    if (productUpdate.type === 'update') {
      this.cartService.modifyProductInCart(productUpdate.id, productUpdate.qty);
      this.cart = this.cartService.getCart();
    } else if (productUpdate.type === 'delete') {
      this.cartService.removeProductFromCart(productUpdate.id);
    }
    this.setCartValue();
  }

  placeOrder(): void {
    this.onGoingRequest = true;
    this.orderService.placeOrder(this.cart, this.cartValue).subscribe((response: boolean) => {
      this.onGoingRequest = false;
      if (response) {
        this.toastr.success('Your order was correctly placed, thank you!');
        this.cartService.removeCart();
        this.cart = this.cartService.getCart();
        this.setCartValue();
      } else {
        this.toastr.error('Error while processing your order, try again later');
      }
    });
  }
}
