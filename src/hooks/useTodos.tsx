import { useState, useEffect } from 'react';
import { Todo } from '@/types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
    }
    return [];
  });
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim()) {
      setTodos([
        ...todos,
        {
          id: crypto.randomUUID(),
          text,
          completed: false,
          createdAt: new Date()
        }
      ]);
    }
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id: string, text: string) => {
    if (text.trim()) {
      setTodos(
        todos.map(todo =>
          todo.id === id ? { ...todo, text } : todo
        )
      );
    }
  };

  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    updateTodo
  };
}
  