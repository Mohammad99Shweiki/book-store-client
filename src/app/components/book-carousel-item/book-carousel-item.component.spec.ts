import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCarouselItemComponent } from './book-carousel-item.component';

describe('BookCarouselItemComponent', () => {
  let component: BookCarouselItemComponent;
  let fixture: ComponentFixture<BookCarouselItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookCarouselItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCarouselItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
