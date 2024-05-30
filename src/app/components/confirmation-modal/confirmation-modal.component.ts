import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html'
})
export class ConfirmationModalComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, isDelete: boolean },
    private dialogRef: MatDialogRef<ConfirmationModalComponent>
  ) { }

  close(){
    this.dialogRef.close(false);
  }

  submit(){
    this.dialogRef.close(true)
  }

}
