import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  books: Book[] = [];
  loggedIn: boolean = false;
  noBooks: boolean = false;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.loggedIn = this.authService.loggedIn();
    this.userService.recommend().subscribe(res => {
      this.books = res;
      if (!this.books.length) {
        this.noBooks = true;
      }
    })
  }

  ngOnInit(): void {
  }
}
