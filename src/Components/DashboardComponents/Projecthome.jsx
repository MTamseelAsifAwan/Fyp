import { useState, useEffect, useRef } from 'react';
import { FaTasks, FaArrowRight } from 'react-icons/fa';
import ProjecthomeSkeleton from '../Loader/ProjecthomeSkeleton';
import { firestore, auth } from "../../Auth/Firebase.jsx";
import { collection, getDocs,orderBy } from "firebase/firestore";

const Projecthome = ({ projectid, onSlectedProject }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [projecttasks, setProjectTasks] = useState([]);
  const containerRef = useRef(null);

  const displayProjectData = async () => {
    if (!projectid){
      setIsLoading(true);
      return;
    }
    else{
    console.log('prop', projectid);

    try {
      setIsLoading(true);
      const response = await getDocs(collection(firestore, `users/${auth.currentUser.uid}/Projects/${projectid}/Tasks`), orderBy('createdAt'));
      const dataItems = response.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProjectTasks(dataItems);
      setIsLoading(false);
    } catch (error) {
      console.log('Error fetching project data:', error);
    }
  }
  };

  useEffect(() => {
    displayProjectData();
  }, [projectid]); // Add projectid as a dependency to re-fetch tasks when it changes

  return (
    <div className="m-2 grid grid-flow-row grid-rows-1 bg-white p-6 rounded-lg">
      <div className='border-t-8 rounded-sm'>
        <h2 className="text-2xl font-bold text-purple-900 pb-4 mt-4">Project Tasks</h2>
        <div ref={containerRef} className="grid grid-flow-row lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 gap-6 h-auto rounded-xl drop-shadow-2xl">
          {projecttasks.map((task, index) => (
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
          ))}
          {isLoading && <div><ProjecthomeSkeleton /></div>}
        </div>
      </div>
    </div>
  );
};

export default Projecthome;
