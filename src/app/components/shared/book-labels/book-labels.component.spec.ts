import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLabelsComponent } from './book-labels.component';

describe('BookLabelsComponent', () => {
  let component: BookLabelsComponent;
  let fixture: ComponentFixture<BookLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookLabelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
