import { DestroyRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateTask, Task } from '../../shared/interfaces/task.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseApi = environment.API_URL;

  constructor(
    private destroyRef: DestroyRef,
    private http: HttpClient,
  ) { }

  getTask(id: number) {
    const url = `${this.baseApi}/api/Tasks/${id}`;

    return this.http.get(url);
  }

  getTasks(): Observable<Task[]> {
    const url = `${this.baseApi}/api/Tasks`;

    return this.http.get<Task[]>(url);
  }

  createTask(payload: CreateTask) {
    const url = `${this.baseApi}/api/Tasks`;

    return this.http.post(url, payload);
  }

  updateTask(id: number, payload: CreateTask) {
    const url = `${this.baseApi}/api/Tasks/${id}`;

    return this.http.put(url, payload);
  }

  deleteTask(id: number) {
    const url = `${this.baseApi}/api/Tasks/${id}`;

    return this.http.delete(url);
  }
}
