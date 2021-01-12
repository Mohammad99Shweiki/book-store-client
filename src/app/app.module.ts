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
import {ScrollTopComponent} from './components/scroll-top/scroll-top.component';
import {NumberIndicatorComponent} from './components/shared/number-indicator/number-indicator.component';
import {BooksFilterComponent} from './components/books-filter/books-filter.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';

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
    ScrollTopComponent,
    NumberIndicatorComponent,
    BooksFilterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    NguCarouselModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
