
export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  isCompleted: boolean;
  userId: number;
}

export interface CreateTask {
  title: string;
  description: string;
  dueDate: string;
  priority: number;
  isCompleted: boolean;
  userId: number;
}
