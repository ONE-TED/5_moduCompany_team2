interface TodoTypes {
  id: number;
  taskName: string;
  stateId: number;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
}

export const getElementIndex = (todoData: TodoTypes[], id: number): number => {
  return todoData.findIndex((todo) => todo.id === id);
};
