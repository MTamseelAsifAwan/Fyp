import { useState, useEffect, useRef, useMemo } from 'react';
import { FaTasks, FaArrowRight } from 'react-icons/fa';
import ProjecthomeSkeleton from '../Loader/ProjecthomeSkeleton';
import { database, auth } from "../../Auth/Firebase.jsx"; // Import the Realtime Database instance and auth
import { ref, onValue, off } from 'firebase/database'; // Import necessary functions from Firebase Realtime Database

const CACHE_KEY = 'project_tasks_cache';

const Projecthome = ({ projectid, onSlectedProject }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projecttasks, setProjectTasks] = useState([]);
  const containerRef = useRef(null);

  // Memoize the tasks to avoid unnecessary re-renders
  const memoizedTasks = useMemo(() => projecttasks, [projecttasks]);

  const setupProjectDataListener = () => {
    if (!projectid) {
      setIsLoading(false); // Stop loading if no project id
      return;
    }

    try {
      // Check local storage for cached data
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cache = cachedData ? JSON.parse(cachedData) : {};
      const cachedTasks = cache[projectid];

      if (cachedTasks) {
        // Use cached data if available
        setProjectTasks(cachedTasks);
        setIsLoading(false);
      }

      // Create a reference to the 'Tasks' node for the selected project
      const tasksRef = ref(database, `users/${auth.currentUser.uid}/Projects/${projectid}/Tasks`);

      // Set up a real-time listener
      const unsubscribe = onValue(tasksRef, (snapshot) => {
        if (snapshot.exists()) {
          const dataItems = Object.entries(snapshot.val()).map(([id, data]) => ({ ...data, id }));
          setProjectTasks(dataItems);

          // Cache the fetched data
          const updatedCache = { ...cache, [projectid]: dataItems };
          localStorage.setItem(CACHE_KEY, JSON.stringify(updatedCache));
        } else {
          console.log('No tasks found for this project.');
          setProjectTasks([]); // Ensure projecttasks is set to an empty array
        }
        setIsLoading(false);
      });

      // Return the unsubscribe function to remove the listener
      return () => {
        unsubscribe();
      };
    } catch (error) {
      console.log('Error fetching project data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Set up the listener and handle cleanup
    const cleanup = setupProjectDataListener();
    
    // Clean up the listener on component unmount or projectid change
    return cleanup;
  }, [projectid]); // Add projectid as a dependency to set up a new listener when it changes

  return (
    <div className="m-2 grid grid-flow-row grid-rows-1 bg-[#f4f7fd] p-6 rounded-lg">
      <div className='border-t-8 rounded-sm'>
        <h2 className="text-2xl font-bold text-purple-900 pb-4 mt-4">Project Tasks</h2>
        <div ref={containerRef} className="grid grid-flow-row lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 gap-6 h-auto rounded-xl drop-shadow-2xl">
          {isLoading && <ProjecthomeSkeleton />}
          {memoizedTasks.length > 0 ? (
            memoizedTasks.map((task, index) => (
              <div key={index} className="w-72 h-40 p-4 gap-2 bg-neutral-50 rounded-lg shadow-xl flex flex-col items-center cursor-pointer transition-all duration-500 hover:translate-y-2">
                <div className="flex items-center gap-3">
                  <FaTasks className="text-3xl text-purple-900" />
                  <span className="font-bold text-purple-900">{task.name}</span>
                </div>
                <div className="flex gap-3">
                  <p className={`px-2 text-sm font-semibold text-center rounded-xl ${task.status === 'Completed' ? 'text-purple-900 bg-purple-200' : task.status === 'In Progress' ? 'text-blue-900 bg-blue-200' : 'text-red-900 bg-red-200'}`}>
                    {task.status}
                  </p>
                  <p className="px-2 text-sm font-semibold text-center text-red-900 bg-red-200 rounded-xl">
                    {task.progress}%
                  </p>
                  <p className="px-2 text-sm font-semibold text-center text-blue-900 bg-blue-200 border rounded-xl">
                    {task.assignedTo}
                  </p>
                </div>
                <button className='mt-8 flex items-center bg-purple-900 pl-2 p-1 text-white rounded-lg text-sm hover:bg-purple-950 hover:font-semibold font-serif'>
                  View
                  <FaArrowRight className='mr-2 ml-2' />
                </button>
              </div>
            ))
          ) : !isLoading ? (
            <div>
              <p className="text-center text-gray-600">No tasks available for this project.</p>
              <ProjecthomeSkeleton/>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Projecthome;
