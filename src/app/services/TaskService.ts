import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/tasks';

  getTasks(): Observable<{ success: boolean; count: number; data: Task[] }> {
    return this.http.get<{ success: boolean; count: number; data: Task[] }>(this.apiUrl);
  }
  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  updateTask(id: number, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }

  updateTaskStatus(id: number, status: string) {

    return this.http.patch(
      `${this.apiUrl}/${id}/status`,
      { status }
    );
  
  }

 

}
