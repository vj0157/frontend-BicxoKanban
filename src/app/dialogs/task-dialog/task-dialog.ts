import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-task-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './task-dialog.html',
  styleUrl: './task-dialog.css',
})
export class TaskDialog {

  private fb = inject(FormBuilder);

  private dialogRef = inject(MatDialogRef<TaskDialog>);

  taskForm = this.fb.group({

    title: ['', Validators.required],

    description: ['', Validators.required],

    priority: ['Medium', Validators.required]

  });

  close() {
    this.dialogRef.close();
  }

  submit() {

    if (this.taskForm.invalid) {

      this.taskForm.markAllAsTouched();

      return;

    }

    this.dialogRef.close(this.taskForm.value);

  }
}
