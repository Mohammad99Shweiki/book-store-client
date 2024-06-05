import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTrackingSectionComponent } from './orders-tracking-section.component';

describe('OrdersTrackingSectionComponent', () => {
  let component: OrdersTrackingSectionComponent;
  let fixture: ComponentFixture<OrdersTrackingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersTrackingSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersTrackingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
