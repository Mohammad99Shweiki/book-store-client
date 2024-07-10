import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
  { path: '', component: BooksListComponent, data: { type: 'main' } },
  { path: 'sales', component: BooksListComponent, data: { type: 'sale' } },
  { path: 'bestsellers', component: BooksListComponent, data: { type: 'bestseller' } },
  { path: 'new', component: BooksListComponent, data: { type: 'new' } },
  { path: 'browse', component: BooksListComponent, data: { type: 'browse' } },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'recommendations', component: RecommendationsComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'cart', component: CartComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: '**', component: MainPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
