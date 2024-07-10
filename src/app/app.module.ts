import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NguCarouselModule } from '@ngu/carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { BookDetailsDialogComponent } from './components/admin-dashboard/components/book-details-dialog/book-details-dialog.component';
import { BooksSectionComponent } from './components/admin-dashboard/components/books-section/books-section.component';
import { OrderDetailsDialogComponent } from './components/admin-dashboard/components/order-details-dialog/order-details-dialog.component';
import { OrdersTrackingSectionComponent } from './components/admin-dashboard/components/orders-tracking-section/orders-tracking-section.component';
import { StatusCardComponent } from './components/admin-dashboard/components/status-card/status-card.component';
import { UserDetailsDialogComponent } from './components/admin-dashboard/components/user-details-dialog/user-details-dialog.component';
import { UsersSectionComponent } from './components/admin-dashboard/components/users-section/users-section.component';
import { BookCarouselItemComponent } from './components/book-carousel-item/book-carousel-item.component';
import { BookCarouselComponent } from './components/book-carousel/book-carousel.component';
import { BookCartComponent } from './components/book-cart/book-cart.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookOrderComponent } from './components/book-order/book-order.component';
import { BookOverviewComponent } from './components/book-overview/book-overview.component';
import { BooksFilterComponent } from './components/books-filter/books-filter.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { CartComponent } from './components/cart/cart.component';
import { ConfirmOrderDialogComponent } from './components/confirm-order-dialog/confirm-order-dialog.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { InfoDialogComponent } from './components/info-dialog/info-dialog.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { RatingSelectorComponent } from './components/rating-selector/rating-selector.component';
import { RatingComponent } from './components/rating/rating.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReviewComponent } from './components/review/review.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';
import { BookLabelsComponent } from './components/shared/book-labels/book-labels.component';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';
import { NumberIndicatorComponent } from './components/shared/number-indicator/number-indicator.component';
import { SocialsComponent } from './components/shared/socials/socials.component';
import { UserComponent } from './components/user/user.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { MaterialModule } from './material.module';
import { CustomDetailPipe } from './pipes/detail/custom-detail.pipe';

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
    ContactComponent,
    SocialsComponent,
    LoginFormComponent,
    RegisterFormComponent,
    UserComponent,
    BookOrderComponent,
    RatingSelectorComponent,
    CartComponent,
    BookCartComponent,
    RecommendationsComponent,
    AdminDashboardComponent,
    BooksSectionComponent,
    BookDetailsDialogComponent,
    ConfirmationModalComponent,
    UsersSectionComponent,
    UserDetailsDialogComponent,
    InfoDialogComponent,
    OrdersTrackingSectionComponent,
    OrderDetailsDialogComponent,
    StatusCardComponent,
    ConfirmOrderDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FontAwesomeModule,
    NguCarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToastrModule.forRoot(),
    MatDialogModule
  ],
  providers: [
    MatDialogModule,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
