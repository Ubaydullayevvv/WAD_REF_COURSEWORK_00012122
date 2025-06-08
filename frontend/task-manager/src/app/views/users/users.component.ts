import { Component } from '@angular/core';
import { CreateUser, User } from '../../shared/interfaces/user.interface';
import { UserService } from '../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../../shared/components/user/user.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { NgForOf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-users',
  imports: [
    MatButton,
    MatIcon,
    MatIconButton,
    NgForOf,
  ],
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  // Student ID: 00012122

  users: User[] = [];

  constructor(
    private userService: UserService,
    private matDialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers()
      .subscribe({
      next: data => this.users = data,
      error: err => console.error('Failed to load users', err)
    });
  }

  remove(user: User): void {
    this.userService.deleteUser(user.id).subscribe({
      next: () => this.users = this.users.filter(u => u.id !== user.id),
      error: err => console.error('Delete failed', err)
    });
  }

  create(): void {
    const ref = this.matDialog.open(UserComponent, { data: null });
    ref.afterClosed().subscribe((newUser: CreateUser) => {
      if (newUser) {
        this.userService.createUser(newUser)
          .subscribe(() => this.loadUsers());
      }
    });
  }

  /** Open modal in “edit” mode */
  edit(user: User): void {
    const ref = this.matDialog.open(UserComponent, { data: user });
    ref.afterClosed().subscribe((updated: User) => {
      if (updated) {
        this.userService.updateUser(updated.id, updated)
          .subscribe(() => this.loadUsers());
      }
    });
  }
}
