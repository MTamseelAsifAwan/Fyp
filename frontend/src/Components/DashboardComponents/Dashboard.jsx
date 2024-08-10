import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import Sidebar from './Sidebar';
import { FaSortDown, FaCaretUp } from 'react-icons/fa';
import { database, auth } from "../../Auth/Firebase.jsx"; // Import the Realtime Database instance and auth
import { ref, onValue } from 'firebase/database'; // Import necessary functions from Firebase Realtime Database

import HomeNavbar from './HomeNavbar';
import Teammembers from './Teammembers';
import ModalTask from './Models/ModalTask'; // Import the ModalTask component
import ModalProject from './Models/ModalProject'; // Import the ModalProject component
import NewTask from './NewTask'; // Import NewTask component directly
import NewProject from './NewProject';

const Projecthome = lazy(() => import('./Projecthome'));

function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [openTab, setOpenTab] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [projectData, setProjectData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false); // State to manage modal visibility
  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false); // State to manage modal visibility
  const dropdownMenuRef = useRef();
  const btnref = useRef();
  const [loading, setLoading] = useState(true);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const setupProjectDataListener = () => {
    const projectsRef = ref(database, `users/${auth.currentUser.uid}/Projects`);

    // Listen for real-time changes to the 'Projects' node
    onValue(projectsRef, (snapshot) => {
      if (snapshot.exists()) {
        const dataItems = Object.entries(snapshot.val()).map(([id, data]) => ({ ...data, id }));
        if (dataItems.length > 0) {
          setProjectData(dataItems); // Update project data
          // Do not reset projectId or selectedProject here
        }
      } else {
        console.log('No data available');
        setProjectData([]);
      }
      setLoading(false); // Hide loading indicator after data is fetched
    });
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
    if (activeSection === 'dashboard') {
      setupProjectDataListener(); // Set up the real-time listener
    }
  }, [activeSection]);

  useEffect(() => {
    // Ensure selectedProject remains unchanged when adding new tasks
  }, [projectId]);

  const handleSelectSection = (section) => {
    setActiveSection(section);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setProjectId(project.id);
    setShowDropdown(false);
  };

  const handleNewTask = () => {
    setIsModalTaskOpen(true); // Open the modal when "New Task" is clicked
  };

  const closeModalTask = () => {
    setIsModalTaskOpen(false); // Close the modal when needed
  };

  const handleModalProject = () => {
    setIsModalProjectOpen(true); // Open the modal when "New Project" is clicked
  };

  const closeModalProject = () => {
    setIsModalProjectOpen(false);
  };

  return (
    <>
      <HomeNavbar />
      <div className="flex h-screen">
        {/* Sidebar (25% width) */}
        <Sidebar className="w-1/4" onSelect={handleSelectSection} activeSection={activeSection} />

        {/* Main content (75% width) */}
        <div className="w-9/12 flex-grow p-6 bg-[#f4f7fd] rounded-3xl">
          {activeSection === 'dashboard' && (
            <>
              <h1 className="text-3xl font-bold text-purple-900">Project Details</h1>
              {selectedProject ? (
                <div>
                  <p><span className="font-bold">Project Name:</span> {selectedProject.name}</p>
                  <p><span className="font-bold">Project Description:</span> {selectedProject.description}</p>
                  <p><span className="font-bold">Project Type:</span> {selectedProject.type}</p>
                </div>
              ) : (
                <p>Please select a project to see the details.</p>
              )}

              <div className="grid justify-end grid-flow-col gap-3">
                <button onClick={handleModalProject} className="w-28 text-base font-serif text-white bg-purple-900 border-none rounded-md hover:bg-purple-950">
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

              {isModalTaskOpen && (
                <ModalTask closeModalTask={closeModalTask}>
                  <NewTask closeModalTask={closeModalTask} />
                </ModalTask>
              )}
              {isModalProjectOpen && (
                <ModalProject closeModalProject={closeModalProject}>
                  <NewProject closeModalProject={closeModalProject} />
                </ModalProject>
              )}
            </>
          )}

          {activeSection === 'marketing' && (
            <div>
              <h1 className="text-3xl font-bold text-purple-900">Marketing Project</h1>
              {/* Add marketing project content here */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
