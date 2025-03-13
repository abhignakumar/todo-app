import { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/todo';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Trash, Edit, CheckCircle, Circle } from 'lucide-react';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
}

export function TodoItem({ todo, toggleTodo, deleteTodo, updateTodo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    updateTodo(todo.id, editValue);
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-card rounded-lg border border-border group">
      <div className="flex items-center gap-3 flex-1">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => toggleTodo(todo.id)}
          className="size-6 rounded-full"
        >
          {todo.completed ? 
            <CheckCircle className="text-primary" /> : 
            <Circle className="text-muted-foreground" />
          }
        </Button>
        
        {isEditing ? (
          <Input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
        ) : (
          <span 
            className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}
          >
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleEdit}
            className="text-muted-foreground hover:text-foreground"
          >
            <Edit size={18} />
          </Button>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => deleteTodo(todo.id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash size={18} />
        </Button>
      </div>
    </div>
  );
}
  