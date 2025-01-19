import React from 'react';
import { useParams } from 'react-router-dom';
import TaskDetails from '../components/TaskDetails';

const TaskDetailsPage = () => {
  const { taskName } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Task Details</h1>
      <TaskDetails taskName={taskName} />
    </div>
  );
};

export default TaskDetailsPage;