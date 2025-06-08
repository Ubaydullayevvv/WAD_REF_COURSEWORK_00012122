import { Component, Inject, OnInit } from '@angular/core';
import { CreateTask, Task } from '../../interfaces/task.interface';
import { TaskService } from '../../../core/services/task.service';
import { DatePipe, NgForOf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-task',
  imports: [
    DatePipe,
    FormsModule,
    NgForOf,
    MatDialogActions,
    MatButton,
    MatCheckbox,
    MatFormField,
    MatLabel,
    MatInput,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatDialogContent
  ],
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {

  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task | null
  ) {
// Determine if create or edit
    this.isEdit = !!data;
// Initialize form
    this.form = this.fb.group({
      title: [data?.title || '', [Validators.required]],
      description: [data?.description || '', [Validators.required]],
      dueDate: [data?.dueDate || '', [Validators.required]],
      priority: [data?.priority || 1, [Validators.required, Validators.min(1)]],
      userId: [data?.userId || 1, [Validators.required]],
      isCompleted: [data?.isCompleted || false]
    });
  }

  ngOnInit(): void {}

  save(): void {
    console.log(this.form.value, this.form.valid)
    if (this.form.invalid) return;

    const value = this.form.value;
    const result: CreateTask | Task = this.isEdit
      ? { ...(this.data as Task), ...value }
      : (value as CreateTask);

    this.dialogRef.close(result);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

