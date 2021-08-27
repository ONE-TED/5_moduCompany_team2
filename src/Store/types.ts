import { Dispatch } from 'react';
// import { TodoAction } from 'Store/actions/todoActions';
import { TaskAction } from 'Store/actions/taskActions';

export interface ITodo {
  id: number;
  taskName: string;
  stateId: 0 | 1 | 2;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
}

export interface ITask {
  taskDueDate: string;
  todos: ITodo[];
}

export type TaskState = {
  taskList: ITask[];
  selectedTask: ITask | null;
};

export type TaskContextType = {
  state: TaskState;
  dispatch: Dispatch<TaskAction>;
};
