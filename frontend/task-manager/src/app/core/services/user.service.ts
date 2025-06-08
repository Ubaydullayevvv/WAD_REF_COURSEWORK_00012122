import { DestroyRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUser, User } from '../../shared/interfaces/user.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Student ID: 00012122

  private baseApi = environment.API_URL;
  constructor(
    private destroyRef: DestroyRef,
    private http: HttpClient,
  ) { }

  getUser(id: number) {
    const url = `${this.baseApi}/api/Users/${id}`;

    return this.http.get(url);
  }

  getUsers(): Observable<User[]> {
    const url = `${this.baseApi}/api/Users`;

    return this.http.get<User[]>(url);
  }

  createUser(payload: CreateUser) {
    const url = `${this.baseApi}/api/Users`;

    return this.http.post(url, payload);
  }

  updateUser(id: number, payload: CreateUser) {
    const url = `${this.baseApi}/api/Users/${id}`;

    return this.http.put(url, payload);
  }

  deleteUser(id: number) {
    const url = `${this.baseApi}/api/Users/${id}`;

    return this.http.delete(url);
  }
}
