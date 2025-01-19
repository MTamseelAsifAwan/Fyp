import { useEffect, useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Tasks = () => {
  const [storedProjectId, setStoredProjectId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const fetchTask = async () => {
    const projectId = localStorage.getItem('selectedProjectId');
    setStoredProjectId(projectId);
    try {
      const response = await axios.get(`http://localhost:4000/api/tasks?projectId=${projectId}`);
      const issues = response.data.issues;
      setTasks(issues);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert('Failed to fetch tasks. Please try again.');
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-10 p-6">
        {/* Skeleton loaders */}
        {[...Array(9)].map((_, index) => (
          <div key={index} className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg animate-pulse">
            <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-400 rounded w-full"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
          </div>
        ))}
      </div>
    );
  }

  const handleTaskClick = (taskName) => {
    history.push(`/task-details/${taskName}`);
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-6 overflow-y-scroll h-[92vh]">
      {tasks.map((item) => (
        <motion.div
          key={item.id}
          className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
          onClick={() => handleTaskClick(item.fields.summary)}
        >
          <div className="flex items-center space-x-2">
            <FaTasks className="text-purple-900 text-2xl" />
            <h2 className="text-lg font-medium tracking-tighter text-black">{item.fields.summary}</h2>
          </div>
          <p className="mt-4 text-sm text-black">Status: {item.fields.status?.statusCategory?.name}</p>
          <button className="mt-4 w-full px-4 py-2 text-center text-white bg-purple-900 rounded-full hover:bg-purple-950">
            See Details
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default Tasks;