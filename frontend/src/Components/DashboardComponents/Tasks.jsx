import React from 'react';
import { FaTasks } from 'react-icons/fa'; // React Icons
import { motion } from 'framer-motion'; // Framer Motion

const Tasks = () => {
  const tasksdata = {
    task1: { title: 'Task 1', description: 'This is a sample task.', status: 'Pending' },
    task2: { title: 'Task 2', description: 'This is another sample task.', status: 'Completed' },
    task3: { title: 'Task 3', description: 'This is a third sample task.', status: 'Pending' },
    task4: { title: 'Task 4', description: 'This is a fourth sample task.', status: 'Completed' },
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {Object.entries(tasksdata).map(([key, item]) => (
        <motion.div
          key={key}
          className="flex flex-col bg-gray-300 rounded-3xl p-4 shadow-lg"
          whileHover={{ scale: 1.05 }} // Animation for hover
          whileTap={{ scale: 0.95 }} // Animation for click
          initial={{ opacity: 0, y: 50 }} // Animation start state
          animate={{ opacity: 1, y: 0 }} // Animation end state
          transition={{ duration: 0.1 }} // Animation duration
        >
          <div className="flex items-center space-x-2">
            <FaTasks className="text-purple-900 text-2xl" /> {/* Task icon */}
            <h2 className="text-lg font-medium tracking-tighter text-black">{item.title}</h2>
          </div>
          <p className="mt-2 text-sm text-black">{item.description}</p>
          <p className="mt-4 text-sm text-black">Status: {item.status}</p>
          <button className="mt-4 w-full px-4 py-2 text-center text-white bg-purple-900 rounded-full hover:bg-purple-950">
            See Details
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default Tasks;
