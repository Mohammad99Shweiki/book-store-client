import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserResolveComponent } from './user-resolve.component';

describe('UserResolveComponent', () => {
  let component: UserResolveComponent;
  let fixture: ComponentFixture<UserResolveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserResolveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserResolveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
