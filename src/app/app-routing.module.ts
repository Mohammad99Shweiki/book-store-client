import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'book/:id', component: BookComponent },
  { path: '**', component: BooksComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
