import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BooksListComponent} from './components/books-list/books-list.component';
import {HttpClientModule} from '@angular/common/http';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {RatingComponent} from './components/rating/rating.component';
import {ReviewComponent} from './components/review/review.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BookOverviewComponent} from './components/book-overview/book-overview.component';
import {LoadingSpinnerComponent} from './components/shared/loading-spinner/loading-spinner.component';
import {CustomDetailPipe} from './pipes/detail/custom-detail.pipe';
import {BookCarouselComponent} from './components/book-carousel/book-carousel.component';
import {NguCarouselModule} from '@ngu/carousel';
import {BookCarouselItemComponent} from './components/book-carousel-item/book-carousel-item.component';
import {BookLabelsComponent} from './components/shared/book-labels/book-labels.component';
import {HeaderMenuComponent} from './components/header-menu/header-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailsComponent,
    RatingComponent,
    ReviewComponent,
    BookOverviewComponent,
    LoadingSpinnerComponent,
    CustomDetailPipe,
    BookCarouselComponent,
    BookCarouselItemComponent,
    BookLabelsComponent,
    HeaderMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    NguCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
