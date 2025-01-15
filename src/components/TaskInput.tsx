import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PlusCircle, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { addTask } from '../store/slices/tasksSlice';
import { Task } from '../types';

const TaskInput: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    dispatch(addTask(newTask));
    setTitle('');
    setPriority('medium');
  };

  const getPriorityIcon = (value: Task['priority']) => {
    switch (value) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'low':
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 placeholder-gray-400"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task['priority'])}
          className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80 appearance-none cursor-pointer pr-10 relative"
        >
          <option value="high" className="flex items-center gap-2">
            High Priority
          </option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

export default TaskInput;