import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../shared/interfaces/task.interface';
import { DatePipe, NgForOf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from '../../shared/components/task/task.component';

@Component({
  selector: 'app-tasks',
  imports: [
    DatePipe,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    MatButton
  ],
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  // Student ID: 00012122

  constructor(
    private taskService: TaskService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.taskService.getTasks()
      .subscribe({
        next: ts => this.tasks = ts,
        error: e => console.error(e)
      });
  }

  toggleCompleted(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.taskService.updateTask(task.id, task).subscribe();
  }

  remove(task: Task) {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }

  edit(task: Task) {
    const dialogRef = this.matDialog.open(TaskComponent,
      {
        data: task,
      });

    dialogRef.afterClosed()
      .subscribe(data => {
        this.taskService.updateTask(data.id, data)
          .subscribe({
            next: () => {
              this.load();
            },
            error: e => console.error(e)
          });
      });
  }

  openCreateTask() {
    const dialogRef = this.matDialog.open(TaskComponent);

    dialogRef.afterClosed()
      .subscribe(data => {
        this.taskService.createTask(data)
          .subscribe({
            next: () => {
              this.load();
            },
            error: e => console.error(e)
          });
      });
  }
}
