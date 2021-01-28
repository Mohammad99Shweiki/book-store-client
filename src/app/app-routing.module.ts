import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {BooksListComponent} from './components/books-list/books-list.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {ContactComponent} from './components/contact/contact.component';
import {UserComponent} from './components/user/user.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {UserResolveComponent} from './components/user-resolve/user-resolve.component';
import {NotLoggedGuard} from './guards/not-logged/not-logged.guard';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'sales', component: BooksListComponent, data: {type: 'sale'}},
  {path: 'bestsellers', component: BooksListComponent, data: {type: 'bestseller'}},
  {path: 'new', component: BooksListComponent, data: {type: 'new'}},
  {path: 'browse', component: BooksListComponent, data: {type: 'browse'}},
  {path: 'book/:id', component: BookDetailsComponent},
  {path: 'about-us', component: AboutUsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'user', component: UserComponent, canActivate: [AuthGuard]},
  {path: 'getUser', component: UserResolveComponent},
  {path: '**', component: MainPageComponent, canActivate: [NotLoggedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
