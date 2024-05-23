import { Book } from '@/models/book';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookDetailFields } from './fields';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-book-details-dialog',
  templateUrl: './book-details-dialog.component.html',
  styleUrls: ['./book-details-dialog.component.css']
})
export class BookDetailsDialogComponent implements OnInit {
  fields = BookDetailFields;
  form: FormGroup;
  userGenres: string[] = [];
  authors: string[] = [];
  awards: string[] = [];
  details = {}
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { book: Book },
    private dialogRef: MatDialogRef<BookDetailsDialogComponent>,
    private fb: FormBuilder
  ) {
    const formConfig = {};
    this.fields.forEach(field => {
      formConfig[field.name] = new FormControl('')
    });
    this.form = this.fb.group(formConfig);
  }

  ngOnInit(): void {
    if (this.data) {
      const book = this.data.book;
      this.userGenres = book.genres;
      this.awards = book.awards;
      this.authors = book.authors;
      this.details = {
        'genres': this.userGenres,
        'authors': this.authors,
        'awards': this.awards
      }
      this.form.patchValue({ ...this.data.book })
    }
  }

  remove(item: string, list: 'genres' | 'authors' | 'awards'): void {
    const index = this.details[list].indexOf(item);

    if (index >= 0) {
      this.details[list].splice(index, 1);
    }
  }


  add(event: MatChipInputEvent, list: 'genres' | 'authors' | 'awards'): void {
    const value = (event.value || '').trim();
    if (value) {
      this.details[list].push(value);
    }
    event.input.value = ''
  }
  close() {
    this.dialogRef.close(null);
  }

  save() {
    const updatedBook = {
      ...this.form.value,
      genres: this.userGenres,
      awards: this.awards,
      authors: this.awards
    }
    this.dialogRef.close(updatedBook)
  }
}
