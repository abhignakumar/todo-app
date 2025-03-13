import { useTodos } from './hooks/useTodos';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import './App.css';

function App() {
  const { todos, addTodo, deleteTodo, toggleTodo, updateTodo } = useTodos();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto max-w-xl p-4 py-8">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">Todo App</h1>
          <p className="text-muted-foreground">
            Manage your tasks efficiently
          </p>
        </header>
        
        <TodoInput addTodo={addTodo} />
        
        <TodoList 
          todos={todos} 
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
        
        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>{todos.length} tasks • {todos.filter(t => t.completed).length} completed</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
  