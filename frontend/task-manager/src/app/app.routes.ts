import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () => import('./views/tasks/tasks.component')
      .then(m => m.TasksComponent),
  },

  {
    path: 'users',
    loadComponent: () => import('./views/users/users.component')
      .then(m => m.UsersComponent),
  },

  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/tasks' },
];
