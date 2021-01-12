import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksListComponent } from './components/books-list/books-list.component';

const routes: Routes = [
  { path: '', component: BooksListComponent, data: {type: 'browse'} }, // to delete later
  { path: 'sales', component: BooksListComponent, data: {type: 'sale'} },
  { path: 'bestsellers', component: BooksListComponent, data: {type: 'bestseller'} },
  { path: 'new', component: BooksListComponent, data: {type: 'new'} },
  { path: 'browse', component: BooksListComponent, data: {type: 'browse'} },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: '**', component: BooksListComponent, data: {type: 'browse'} } // to delete later
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
