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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from './components/footer/footer.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {ContactComponent} from './components/contact/contact.component';
import {SocialsComponent} from './components/shared/socials/socials.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {UserResolveComponent} from './components/user-resolve/user-resolve.component';
import {UserComponent} from './components/user/user.component';
import {ToastrModule} from 'ngx-toastr';
import { BookOrderComponent } from './components/book-order/book-order.component';
import { RatingSelectorComponent } from './components/rating-selector/rating-selector.component';
import { CartComponent } from './components/cart/cart.component';
import { BookCartComponent } from './components/book-cart/book-cart.component';

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
    FooterComponent,
    MainPageComponent,
    AboutUsComponent,
    ContactComponent,
    SocialsComponent,
    LoginFormComponent,
    RegisterFormComponent,
    UserResolveComponent,
    UserComponent,
    BookOrderComponent,
    RatingSelectorComponent,
    CartComponent,
    BookCartComponent
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
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
