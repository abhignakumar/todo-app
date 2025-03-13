import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

interface TodoInputProps {
  addTodo: (text: string) => void;
}

export function TodoInput({ addTodo }: TodoInputProps) {
  const [text, setText] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
      />
      <Button type="submit" disabled={!text.trim()}>
        <Plus size={18} />
        Add
      </Button>
    </form>
  );
}
  