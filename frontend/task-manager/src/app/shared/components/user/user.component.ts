import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { CreateUser, User } from '../../interfaces/user.interface';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-user',
  imports: [
    MatButton,
    MatCheckbox,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatFormField
  ],
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {


  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
// Determine if create or edit
    this.isEdit = !!data;
// Initialize form
    this.form = this.fb.group({
      username: [data?.username || '', [Validators.required]],
      email: [data?.email || '', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  save(): void {
    console.log(this.form.value, this.form.valid)
    if (this.form.invalid) return;

    const value = this.form.value;
    const result: CreateUser | User = this.isEdit
      ? { ...(this.data as User), ...value }
      : (value as CreateUser);

    this.dialogRef.close(result);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
