import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Trash2, CheckCircle, Circle, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { removeTask, toggleTask, updateTaskPriority } from '../store/slices/tasksSlice';
import { RootState } from '../store';
import { Task } from '../types';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const dispatch = useDispatch();

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 border-red-200';
      case 'medium':
        return 'text-yellow-500 border-yellow-200';
      case 'low':
        return 'text-green-500 border-green-200';
      default:
        return 'text-gray-500 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-4 h-4" />;
      case 'medium':
        return <Clock className="w-4 h-4" />;
      case 'low':
        return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleTask(task.id))}
              className="focus:outline-none transform hover:scale-110 transition-transform duration-200"
            >
              {task.completed ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
            </button>
            <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'} font-medium`}>
              {task.title}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={task.priority}
              onChange={(e) =>
                dispatch(
                  updateTaskPriority({
                    id: task.id,
                    priority: e.target.value as Task['priority'],
                  })
                )
              }
              className={`px-3 py-1.5 rounded-lg border ${getPriorityColor(
                task.priority
              )} bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer`}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button
              onClick={() => dispatch(removeTask(task.id))}
              className="text-red-500 hover:text-red-600 focus:outline-none transform hover:scale-110 transition-transform duration-200"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No tasks yet. Add some tasks to get started!</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;