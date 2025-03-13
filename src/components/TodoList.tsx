import { useState } from 'react';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
}

export function TodoList({ todos, toggleTodo, deleteTodo, updateTodo }: TodoListProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  // Sort todos: uncompleted first, then by creation date (newest first)
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
  
  return (
    <div className="space-y-4">
      <div className="flex justify-center mb-4 bg-card rounded-lg p-1 w-fit mx-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-md ${
            filter === 'all' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded-md ${
            filter === 'active' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded-md ${
            filter === 'completed' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
          }`}
        >
          Completed
        </button>
      </div>
      
      {sortedTodos.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          {filter === 'all' 
            ? "You haven't added any todos yet." 
            : filter === 'active' 
            ? "You don't have any active todos." 
            : "You don't have any completed todos."}
        </div>
      ) : (
        <div>
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          ))}
        </div>
      )}
    </div>
  );
}
  