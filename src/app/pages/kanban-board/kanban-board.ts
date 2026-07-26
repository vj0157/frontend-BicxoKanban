import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/TaskService';
import { Task } from '../../models/task.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialog } from '../../dialogs/task-dialog/task-dialog';
import { ChangeDetectorRef } from '@angular/core';
import {
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CdkDropList,
    CdkDrag,

  ],
  templateUrl: './kanban-board.html',
  styleUrl: './kanban-board.css',
})
export class KanbanBoard {

  searchText = '';

  selectedPriority = 'All';

  private taskService = inject(TaskService);

  private dialog = inject(MatDialog);

  tasks: Task[] = [];
  todoTasks: Task[] = [];
  progressTasks: Task[] = [];
  doneTasks: Task[] = [];

  private fb = inject(FormBuilder);

  taskForm = this.fb.group({

    title: ['', Validators.required],

    description: ['', Validators.required],

    priority: ['Medium', Validators.required]

  });

  showForm = false;

  ngOnInit(): void {
    this.loadTasks();
  }
  private matchesFilters(task: Task): boolean {

    const search = this.searchText.trim().toLowerCase();

    const matchesSearch =
      !search ||
      task.title?.toLowerCase().includes(search) ||
      task.description?.toLowerCase().includes(search);

    const matchesPriority =
      this.selectedPriority === 'All' ||
      task.priority === this.selectedPriority;

    return matchesSearch && matchesPriority;
  }

  get filteredTodoTasks(): Task[] {
    return this.todoTasks.filter(t => this.matchesFilters(t));
  }

  get filteredProgressTasks(): Task[] {
    return this.progressTasks.filter(t => this.matchesFilters(t));
  }

  get filteredDoneTasks(): Task[] {
    return this.doneTasks.filter(t => this.matchesFilters(t));
  }


  createTask() {

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.taskService.createTask(this.taskForm.value).subscribe({

      next: () => {

        alert("Task Created Successfully");

        this.showForm = false;

        this.taskForm.reset({
          priority: 'Medium'
        });

        this.loadTasks();

      },

      error: (error) => {

        console.error(error);

      }

    });

  }
  private cdr = inject(ChangeDetectorRef);
  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        this.tasks = response.data;
        this.todoTasks = this.tasks.filter(t => t.status === 'To Do');
        this.progressTasks = this.tasks.filter(t => t.status === 'In Progress');
        this.doneTasks = this.tasks.filter(t => t.status === 'Done');
        this.cdr.detectChanges();
      }
    });

  }

  openDialog() {

    const dialogRef = this.dialog.open(TaskDialog, {

      width: '550px',


      disableClose: true

    });

    dialogRef.afterClosed().subscribe(result => {

      if (!result) return;

      this.taskService.createTask(result).subscribe({

        next: () => {
          this.loadTasks();
        },

        error: (err) => {
          console.error(err);
        }

      });

    });

  }

  drop(

    event: CdkDragDrop<any[]>,
    status: 'To Do' | 'In Progress' | 'Done'
  ): void {
    console.log("Drop event fired");


    if (event.previousContainer === event.container) {

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      return;
    }

    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const task = event.container.data[event.currentIndex];

    const oldStatus = task.status;

    task.status = status;

    this.taskService.updateTaskStatus(task.id, status).subscribe({

      next: (response) => {

        console.log("Task status updated successfully", response);

      },

      error: (error) => {

        console.error("Failed to update task", error);

        // Restore previous status if API fails
        task.status = oldStatus;

        this.loadTasks();

      }

    });

  }
}
