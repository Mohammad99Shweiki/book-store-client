import { ReportOrder } from '@/models/order';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.css']
})
export class OrderDetailsDialogComponent implements OnInit {
  form: FormGroup;
  cartItems: {isbn: string; book: ReportOrder['cart']['items']['']}[];
  authors: string;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { order: ReportOrder }
  ) {
    this.form = this.fb.group({
      date: [{ value: '', disabled: true }],
      totalPrice: [{ value: '', disabled: true }],
      status: [{ value: '', disabled: true }],
      phoneNo: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
    })
  }

  ngOnInit(): void {
    if (this.data) {
      const order = this.data.order;
      this.cartItems = Object.entries(order.cart.items).map((item) => {
        return { isbn: item[0], book: item[1] }
      })
      this.form.patchValue({ ...order })
    }
  }

}
