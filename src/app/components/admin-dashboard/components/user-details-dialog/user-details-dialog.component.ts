import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserDetailFields } from './fields';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from '@/models/userData';

@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.css']
})
export class UserDetailsDialogComponent implements OnInit {
  form: FormGroup;
  fields = UserDetailFields;
  textNumberFields = UserDetailFields.filter(filter => filter.type != 'boolean');
  booleanFields = UserDetailFields.filter(filter => filter.type == 'boolean');
  yesNoOptions = [
    { name: 'Yes', value: true },
    { name: 'No', value: false }
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { user: UserData },
    private dialogRef: MatDialogRef<UserDetailsDialogComponent>
  ) {
    const formConfig = {};
    this.fields.forEach(field => {
      formConfig[field.name] = new FormControl({ value: '', disabled: field.disabled })
    });
    this.form = this.fb.group(formConfig);
  }

  ngOnInit(): void {
    if (this.data.user) {
      this.form.patchValue({ ...this.data.user })
    }
  }

  save() {
    const updateUser = this.form.value;
    this.dialogRef.close({...updateUser, userId: this.data.user.userId})
  }

  close() {
    this.dialogRef.close(null);
  }

}
