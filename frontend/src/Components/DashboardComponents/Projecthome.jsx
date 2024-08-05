import  { useState, useEffect, useRef } from 'react';
import { FaTasks ,FaArrowRight } from 'react-icons/fa';
import ProjecthomeSkeleton from '../Loader/ProjecthomeSkeleton';

const Projecthome = () => {
  const [visibleTasks, setVisibleTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  const avatars = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a04258a2462d826712d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "https://i.pravatar.cc/150?u=a04258114e29026302d",
    "https://i.pravatar.cc/150?u=a04258114e29026702d",
    "https://i.pravatar.cc/150?u=a04258114e29026708c"
  ];

  const projecttasks = [
    { title: 'Design HomePage', status: 'Completed', progress: '20%', Assignedt0: "Tamseel" },
    { title: 'Create User Interface', status: 'In Progress', progress: '50%', Assignedt0: "Ashley" },
    { title: 'Design Database Schema', status: 'Dev Completed', progress: '0%', Assignedt0: "Raheel" },
    { title: 'Authentication', status: 'Completed', progress: '100%', Assignedt0: "Asif" },
    { title: 'Write Test Cases', status: 'In Progress', progress: '70%', Assignedt0: "Raheel" },
    { title: 'Finalize Project', status: 'Pending', progress: '30%', Assignedt0: "Ashley" },
    { title: 'Create Documentation', status: 'Completed', progress: '100%', Assignedt0: "Raheel" },
    { title: 'Launch Project', status: 'In Progress', progress: '60%', Assignedt0: "Ashley" },
    { title: 'Monitor Progress', status: 'Completed', progress: '100%', Assignedt0: "Raheel" },
    { title: 'Review Code', status: 'Pending', progress: '50%', Assignedt0: "Tamseel" },
    { title: 'Finalize Project', status: 'In Progress', progress: '80%', Assignedt0: "Ashley" },
    { title: 'Create Release Notes', status: 'Completed', progress: '100%', Assignedt0: "Raheel" },
    { title: 'Launch Project', status: 'Dev Completed', progress: '40%', Assignedt0: "Ashley" },
    { title: 'Monitor Progress', status: 'Completed', progress: '100%', Assignedt0: "Raheel" },
    { title: 'Review Code', status: 'Pending', progress: '50%', Assignedt0: "Tamseel" },
    { title: 'Finalize Project', status: 'In Progress', progress: '80%', Assignedt0: "Ashley" },
    { title: 'Create Release Notes', status: 'Completed', progress: '100%', Assignedt0: "Raheel" },
  ];

  useEffect(() => {
    loadMoreTasks();
  }, []);

  

  const loadMoreTasks = () => {
    if (isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      const startIndex = currentPage * 6;
      const newTasks = projecttasks.slice(startIndex, startIndex + 6);
      setVisibleTasks(prevTasks => [...prevTasks, ...newTasks]);
      setCurrentPage(prevPage => prevPage + 1);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="m-2 grid grid-flow-row grid-rows-1 bg-white p-6 rounded-lg ">
    
    
      <div className='border-t-8 rounded-sm '>
        <h2 className="text-2xl font-bold text-purple-900 pb-4 mt-4 ">Project Tasks</h2>
        <div ref={containerRef} className="grid grid-flow-row  lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 gap-6 h-auto  rounded-xl drop-shadow-2xl ">
          {visibleTasks.map((task, index) => (
            <div key={index} className="w-72 h-40 p-4 gap-2 bg-neutral-50 rounded-lg shadow-xl flex flex-col items-center cursor-pointer transition-all duration-500 hover:translate-y-2">
              <div className="flex items-center gap-3">
                <FaTasks className="text-3xl text-purple-900" />
                <span className="font-bold text-purple-900">{task.title}</span>
              </div>
              <div className="flex gap-3">
                <p className={`px-2 text-sm font-semibold text-center rounded-xl ${task.status === 'Completed' ? 'text-purple-900 bg-purple-200' : task.status === 'In Progress' ? 'text-blue-900 bg-blue-200' : 'text-red-900 bg-red-200'}`}>
                  {task.status}
                </p>
                <p className="px-2 text-sm font-semibold text-center text-red-900 bg-red-200 rounded-xl">
                  {task.progress}
                </p>
                <p className="px-2 text-sm font-semibold text-center text-blue-900 bg-blue-200 border rounded-xl">
                  {task.Assignedt0}
                </p>
              </div>
              {/* <div className="relative flex items-baseline grid-flow-col">
                <div className="p-4 flex items-center">
                  <AvatarGroup isBordered>
                    {avatars.slice(0, 2).map((src, idx) => (
                      <Avatar key={idx} src={src} />
                    ))}
                  </AvatarGroup>
                  {avatars.length > 2 && (
                    <div
                      className="relative cursor-pointer ml-2"
                      onMouseEnter={() => setHoveredTask(index)}
                      onMouseLeave={() => setHoveredTask(null)}
                    >
                      <label className='bg-gray-200 rounded-xl text-sm '>
                        {`+${avatars.length - 2}`}
                      </label>
                      {hoveredTask === index && (
                        <div className="absolute left-0 top-8 p-2 bg-white border rounded shadow-lg z-10">
                          <AvatarGroup isBordered>
                            {avatars.slice(2).map((src, idx) => (
                              <Avatar key={idx} src={src} />
                            ))}
                          </AvatarGroup>
                        </div>
                      )}
                    </div>
                  )}
                  
                </div>
              </div> */}
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
