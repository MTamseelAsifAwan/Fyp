import { useEffect, useRef, useState, lazy, Suspense, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSortDown, FaCaretUp } from 'react-icons/fa';
import { firestore, auth } from "../../Auth/Firebase.jsx";
import { collection, getDocs } from "firebase/firestore";
import HomeNavbar from './HomeNavbar.jsx';
import Teammembers from './Teammembers.jsx';

const Projecthome = lazy(() => import('./Projecthome.jsx'));
export const ProjectNameContext = createContext();

function Dashboard() {
  const [openTab, setOpenTab] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [projectData, setProjectData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const dropdownMenuRef = useRef();
  const [loading, setLoading] = useState(true);
  const btnref = useRef();
  const navigate = useNavigate();

  const NewProjectHandle = () => {
    navigate('/newproject');
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const displayProjectData = async () => {
    try {
      const response = await getDocs(collection(firestore, `users/${auth.currentUser.uid}/Projects`));
      const dataItems = response.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProjectData(dataItems);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching project data:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(e.target) &&
        btnref.current && !btnref.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    displayProjectData();
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setProjectId(project.id);
    setShowDropdown(false);
  };

  const handleNewTask = () => {
    navigate('/newtask');
  };

  return (
    <>
      <HomeNavbar />
      <div className='p-6'>
        <h1 className="text-3xl font-bold text-purple-900">Project Details</h1>
        {selectedProject ? (
          <div>
            <p>
              <span className="font-bold">Project Name:</span> {selectedProject.name}
            </p>
            <p>
              <span className="font-bold">Project Description:</span> {selectedProject.description}
            </p>
            <p>
              <span className="font-bold">Project Type:</span> {selectedProject.type}
            </p>
          </div>
        ) : (
          <p>Please select a project to see the details.</p>
        )}
        <div className="grid justify-end grid-flow-col gap-3">
          <button onClick={NewProjectHandle} className="w-28 text-base font-serif text-white bg-purple-900 border-none rounded-md hover:bg-purple-950">
            New Project
          </button>
          <button
            className="flex items-center w-[9rem] pl-2 text-base font-serif text-white bg-purple-900 border-none rounded-md hover:bg-purple-950"
            onClick={toggleDropdown}
            ref={btnref}
          >
            Select Project
            {showDropdown ? (
              <span className="ml-1"><FaCaretUp /></span>
            ) : (
              <span className="ml-1"><FaSortDown /></span>
            )}
          </button>
          {showDropdown && (
            <div
              ref={dropdownMenuRef}
              className="absolute right-0 mt-8 mr-10 h-28 w-auto p-4 bg-white border border-gray-300 rounded-lg shadow-lg overflow-auto"
            >
              {loading ? (
                <p className='block px-4 pb-2 pt-1 text-center bg-gray-100 h-8 m-2 animate-bounce'>.........</p>
              ) : (
                <ul className="grid grid-flow-row">
                  {projectData.map((project) => (
                    <li
                      key={project.id}
                      onClick={() => handleProjectSelect(project)}
                      className="block px-4 pb-2 pt-1 text-center bg-gray-100 h-8 m-2 text-gray-900 hover:bg-gray-200 rounded-lg cursor-pointer"
                    >
                      {project.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          <div className="flex items-center w-[7rem] pl-2 text-base font-serif text-white bg-purple-900 border-none rounded-md hover:bg-purple-950">
            <button
              className='w-20 text-base font-serif text-white bg-purple-00 border-none rounded-md hover:bg-purple-950'
              onClick={handleNewTask}
            >
              New Task
            </button>
          </div>
        </div>

        <div className="flex w-1/3 mb-4 space-x-4 p-2 bg-gray-100 rounded-lg shadow-md">
          <button
            onClick={() => setOpenTab(1)}
            className={`flex-1 py-2 px-4 text-sm rounded-md transition-all duration-300 ${openTab === 1 ? 'bg-purple-900 text-white font-bold' : 'bg-gray-200 text-black'}`}
          >
            General
          </button>
          <button
            onClick={() => setOpenTab(2)}
            className={`flex-1 py-2 px-4 text-sm rounded-md transition-all duration-300 ${openTab === 2 ? 'bg-purple-900 text-white font-bold' : 'bg-gray-200 text-black'}`}
          >
            Members
          </button>
        </div>
        {openTab === 1 && (
          <Suspense fallback={<p>Loading...</p>}>
            <Projecthome projectid={projectId} onSlectedProject={handleProjectSelect} />
          </Suspense>
        )}
        {openTab === 2 && <Teammembers />}
        {openTab !== 1 && openTab !== 2 && <p>Invalid tab</p>}
      </div>
    </>
  );
}

export default Dashboard;
