// todos/dto/paginated-todos.dto.ts
import { Todo } from '../todo.entity';

export class PaginatedTodosDto {
  todos: Todo[];
  total: number;
  page: number;
  limit: number;
  lastPage: number;
}
