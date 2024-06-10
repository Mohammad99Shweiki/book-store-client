import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-order-dialog',
  templateUrl: './confirm-order-dialog.component.html',
  styleUrls: ['./confirm-order-dialog.component.css']
})
export class ConfirmOrderDialogComponent implements OnInit {
  form: FormGroup
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ConfirmOrderDialogComponent>
  ) {
    this.form = this.fb.group({
      address: [''],
      phoneNo: ['']
    })
  }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.form.value)
  }
}
