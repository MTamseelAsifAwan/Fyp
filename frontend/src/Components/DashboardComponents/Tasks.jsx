import { useEffect, useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import moment from 'moment'; // Ensure moment is installed and imported correctly

const Tasks = () => {
  const [storedProjectId, setStoredProjectId] = useState('');
  const [storedtaskid, setStoredtaskid] = useState(''); // Add selectedTask state
  const [tasks, setTasks] = useState([]);
  const [tasksdetails, setTasksdetails] = useState([]); // Add selectedTask state
  const [loading, setLoading] = useState(true);  // Add loading state
  const [state, setState] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null); // Add selectedTask state
  const [selectedtaskid, setSelectedtaskid] = useState(null); // Add selectedTask state
  const [taskDetails, setTaskDetails] = useState(null); // Add taskDetails state
  const [viewDetails, setViewDetails] = useState(false); // Add viewDetails state
  const [loadingDetails, setLoadingDetails] = useState(false); // Add loadingDetails state

  const fetchTask = async () => {
    const projectId = localStorage.getItem('selectedProjectId');
    setStoredProjectId(projectId);
    console.log('Selected Project ID:', projectId); // Console log selected project ID
    try {
      const response = await axios.get(`http://localhost:4000/api/tasks?projectId=${projectId}`);
      const issues = response.data.issues;
      setTasks(issues);
      setLoading(false);  // Set loading to false once data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false);  // Set loading to false in case of error
      alert('Failed to fetch tasks. Please try again.');
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  useEffect(() => {
    const storedTask = localStorage.getItem('selectedTask');
    if (storedTask) {
      const parsedTask = JSON.parse(storedTask);
      setSelectedTask(parsedTask);
      setSelectedtaskid(parsedTask.fields.id);  // Save selected task id to local storage
      setState(true);
    }
  }, []);

  const handleTaskClick = async (task) => {
    setSelectedTask(task);
    setState(true);
    setLoadingDetails(true); // Set loadingDetails to true when fetching details
    localStorage.setItem('selectedTask', JSON.stringify(task)); // Save selected task to local storage
    localStorage.setItem('selectedTaskId', JSON.stringify(task.id)); // Save selected task ID to local storage
  
    console.log('Selected Task ID:', task.id); // Console log selected task ID
  
    try {
      const response = await axios.get(`http://localhost:4000/api/tasksdetails?taskId=${task.id}`);
      const taskDetails = response.data;
      setTaskDetails(taskDetails); // Set taskDetails state
      setViewDetails(true); // Set viewDetails to true to show task details
      setLoadingDetails(false); // Set loadingDetails to false after fetching details
      console.log('taskDetails', taskDetails);
      console.log('discription', taskDetails.fields.issuetype.description);
      console.log('start date', taskDetails.fields.created);
      console.log('due date', taskDetails.fields.duedate);
    } catch (error) {
      console.error(error);
      setLoadingDetails(false); // Set loadingDetails to false in case of error
      alert('Failed to fetch task details. Please try again.');
    }
  };

  const handleBackClick = () => {
    setViewDetails(false); // Set viewDetails to false to go back to tasks list
  };

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-10 p-6">
        {/* Skeleton loaders */}
        <div className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg animate-pulse">
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
          <div className="h-1 bg-gray-400 rounded w-full"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
        </div>
        <div className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg animate-pulse">
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-400 rounded w-full"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
        </div>
        <div className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg animate-pulse">
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-400 rounded w-full"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
        </div>
        <div className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg animate-pulse">
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-400 rounded w-full"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
        </div>
        <div className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg animate-pulse">
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-400 rounded w-full"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
        </div>
        <div className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg animate-pulse">
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-400 rounded w-full"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
        </div>
        <div className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg animate-pulse">
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-400 rounded w-full"></div>
        </div>
        <div className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg animate-pulse">
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-400 rounded w-full"></div>
        </div>
        <div className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg animate-pulse">
          <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-400 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (viewDetails) {
    if (loadingDetails) {
      return (
        <div className="p-6">
          <button
            className="mb-4 px-4 py-2 text-white bg-purple-900 rounded-full hover:bg-purple-950"
            onClick={handleBackClick}
          >
            Back to Tasks
          </button>
          <div className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg animate-pulse">
            <div className="h-6 bg-gray-400 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2 mb-4"></div>
            <div className="h-10 bg-gray-400 rounded w-full"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6">
        <button
          className="mb-4 px-4 py-2 text-white bg-purple-900 rounded-full hover:bg-purple-950"
          onClick={handleBackClick}
        >
          Back to Tasks
        </button>
        <div className="bg-white rounded-3xl shadow-lg p-4">
          <h2 className="text-2xl font-bold mb-4">Task Details</h2>
          <p><strong>Name:</strong> {selectedTask.fields.summary}</p>
          <p><strong>ID:</strong> {selectedTask.id}</p>
          <p><strong>Created:</strong> {taskDetails.fields.created ? moment(taskDetails.fields.created).format('MMMM Do YYYY, h:mm:ss a') : 'Date is not selected'}</p>
          <p><strong>Due Date:</strong> {taskDetails.fields.duedate ? moment(taskDetails.fields.duedate).format('MMMM Do YYYY, h:mm:ss a') : 'Date is not selected'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-6 overflow-y-scroll h-[92vh]">
    {Object.entries(tasks).map(([key, item]) => (
      <motion.div
        key={key}
        className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1 }}
        onClick={() => handleTaskClick(item)}
      >
        <div className="flex items-center space-x-2">
          <FaTasks className="text-purple-900 text-2xl" />
          <h2 className="text-lg font-medium tracking-tighter text-black">{item.fields.summary}</h2>
        </div>
        <p className="mt-4 text-sm text-black">Status: {item.fields.status?.statusCategory?.name}</p>

        <button
          className="mt-4 w-full px-4 py-2 text-center text-white bg-purple-900 rounded-full hover:bg-purple-950"
          onClick={() => {
            setLoadingDetails(true); // Show loading state immediately after clicking
            handleTaskClick(item);
          }}
        >
          See Details
        </button>
      </motion.div>
    ))}
  </div>
  );
};

export default Tasks;
