import { ITodo } from 'Store/types';

export const getElementIndex = (todoData: ITodo[], id: number): number => {
  return todoData.findIndex((todo) => todo.id === id);
};
