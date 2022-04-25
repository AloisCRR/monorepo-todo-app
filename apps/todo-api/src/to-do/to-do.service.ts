import type { ToDo } from '@monorepo-todo-app/todo-api-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class ToDoService {
  private readonly exampleTodos: ToDo[] = [
    { description: 'Test ToDo API', id: 'some-uuid', title: 'Hello!!' }
  ];

  getAllTodos(): ToDo[] {
    return this.exampleTodos;
  }
}
