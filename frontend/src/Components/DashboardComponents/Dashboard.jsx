import React, { useState, useRef, useEffect, Suspense, lazy } from 'react';
import Sidebar from './Sidebar';
import { FaSortDown, FaCaretUp } from 'react-icons/fa';
import { database, auth } from "../../Auth/Firebase.jsx"; // Import the Realtime Database instance and auth
import { ref, onValue,get } from 'firebase/database'; // Import necessary functions from Firebase Realtime Database
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import heroimage from '../Ladingpagecomponents/assets/hero/hero-background.jpg'; // Import the hero image
import HomeNavbar from './HomeNavbar';
import Teammembers from './Teammembers';
import ModalTask from './Models/ModalTask'; // Import the ModalTask component
import ModalProject from './Models/ModalProject'; // Import the ModalProject component
import Tasks from './Tasks.jsx'; // Import Tasks component directly
import NewProject from './NewProject';
const Chatroom = lazy(() => import('./Setting.jsx'));
const Projecthome = lazy(() => import('./Projecthome'));
import axios from 'axios'; 
import { FaTasks, FaClipboardList, FaHourglassStart , FaCheckCircle } from 'react-icons/fa'; // Import icons from react-icons

function Dashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [openTab, setOpenTab] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [projectData, setProjectData] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalTaskOpen, setIsModalTaskOpen] = useState(false); // State to manage modal visibility
  const [isModalProjectOpen, setIsModalProjectOpen] = useState(false); // State to manage modal visibility
  const dropdownMenuRef = useRef();
  const btnref = useRef();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totaltodo, settodo] = useState(0);
  const [totalinprogress, setinprogress] = useState(0);
  const [totaldone, setotaldone] = useState(0);
  const [taskSummary, setTaskSummary] = useState({});

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  // Example function to process the issues data
  const processIssuesData = (issues) => {
    const categoryCounts = {
      toDo: 0,
      inProgress: 0,
      done: 0,
    };
  
    const processedData = issues.map((issue) => {
      const statusCategory = issue.fields.status?.statusCategory?.name || 'Unknown';
  
      if (statusCategory.trim().toLowerCase() === 'to do') {
        categoryCounts.toDo += 1;
        settodo(categoryCounts.toDo);
      } else if (statusCategory.trim().toLowerCase() === 'in progress') {
        categoryCounts.inProgress += 1;
        setinprogress(categoryCounts.inProgress); 
      } else if (statusCategory.trim().toLowerCase() === 'done') {
        categoryCounts.done += 1;
        setotaldone(categoryCounts.done);
      }
  
      return {
        name: issue.fields.summary || 'Unknown',
        statusCategory,
      };
    });
  
    // You no longer need percentages, just return the category counts
    setTaskSummary(categoryCounts);
  
    return processedData;
  };
  
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/tasks');
      const issues = response.data.issues;
      const processedData = processIssuesData(issues);
      setProjectTasks(processedData);
      setTotalTasks(response.data.total);
      setLoading(false);
    } catch (err) {
      setError('Error fetching data');
      console.error('Error fetching data:', err);
    }
  };
  


  const fetchProjects = async () => {
    try {
      setLoading(true); // Set loading state while fetching
      const response = await axios.get('http://localhost:4000/api/projects');
      
      setProjectData(response.data);  // Save the project data to state
      console.log(response.data);     // Log the data to the console to see it
      setLoading(false);              // Stop loading
    } catch (err) {
      console.error('Error fetching data:', err); // Log the error to the console
      setError(err.message);   // Handle errors if fetching fails
      setLoading(false);
    }
  };
  

  
useEffect (() => {
  fetchTasks(); // Fetch tasks on initial render
},[]);

  

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
      fetchProjects();
    }
  }, [activeSection]); // Include database as a dependency
  

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

  const handleTasks = () => {
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
  const members=[
    {id:1,name:'John Doe',email:'john.doe@example.com',role:'Developer'},
    {id:2,name:'Jane Doe',email:'jane.doe@example.com',role:'Designer'},
    {id:3,name:'Alice Doe',email:'alice.doe@example.com',role:'Tester'},
    {id:4,name:'Bob Doe',email:'bob.doe@example.com',role:'Developer'},
    {id:5,name:'Emily Doe',email:'emily.doe@example.com',role:'Designer'},
    {id:6,name:'David Doe',email:'david.doe@example.com',role:'Tester'},
    {id:7,name:'Sarah Doe',email:'sarah.doe@example.com',role:'Developer'},
  ]
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,  // Show 3 cards at a time
    slidesToScroll: 1, // Scroll one card at a time
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };
  return (
    <>
      {/* <HomeNavbar /> */}
      <div className="flex h-screen "
          style={{ backgroundImage: `url(${heroimage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
>
        
        {/* Sidebar (25% width) */}
        <Sidebar className="w-1/4" onSelect={handleSelectSection} activeSection={activeSection} />

        {/* Main content (75% width) */}
        <div className="w-9/12 flex-grow pl-3 pr-3 shadow-2xl rounded-3xl h-screen mr-2 ml-1">
  {activeSection === 'dashboard' && (
    <Suspense fallback={<p>Loading...</p>}>
      <Projecthome projectid={projectId} onSlectedProject={handleProjectSelect} />
    </Suspense>
  )}



          {activeSection === 'teams' && (
            <div>
                      <h1 className="text-2xl text-purple-900 font-bold mt-2 ml-1 mb-4">Sprinty Teams</h1>

   <div className='pl-6 border-t grid-rows-1 grid-flow-row'>
 <div>
 <button className='mt-3 bg-purple-900 text-white font-serif rounded-lg h-8 w-32 hover:bg-purple-800'>
      Create Team
      </button>
      </div>
      <div>
        <h1 className='mt-6 text-xl font-serif font-bold'>Joining Link</h1>
        <input type='text' placeholder='Joinig Link' className='border-2 border-gray-900 rounded-lg w-1/2 h-8 pl-2 mt-3' />
        <button className='mb-7 ml-2 bg-purple-900 text-white font-serif rounded-lg h-8 w-32 hover:bg-purple-800'>
          Copy
        </button>
        </div>
<div>
  <h2 className='font-bold text-xl font-serif'>
    Current Teams Members
  </h2>
  <Slider {...settings}>
      {members.map((task, index) => (
        <div 
          key={index} 
          className="w-[21rem] h-[10rem] p-0 border border-gray-200 bg-neutral-50 drop-shadow-md flex flex-col items-center cursor-pointer transition-all duration-500 hover:translate-y-2"
        >
          <div className="flex items-center gap-3 mt-3">
            <span className="font-bold text-purple-900">{task.name}</span>
          </div>
          <div className="flex gap-2">
            <p className='px-2 text-sm font-semibold text-center rounded-xl bg-green-500'>
              {task.role}
            </p>
            <p className="px-2 text-sm font-semibold text-center text-red-900 bg-red-200 rounded-xl">
              {task.email}
            </p>
          </div>
          <button 
            className='mt-8 flex items-center bg-purple-900 pl-2 p-1 text-white rounded-lg text-sm hover:bg-purple-950 hover:font-semibold font-serif'
          >
            Remove
          </button>
        </div>
      ))}
    </Slider>



  </div>

    </div>
            </div>
          )}
          {activeSection === 'reports' && (
            <div>
              <h1 className="text-3xl font-bold text-purple-900">Reports</h1>
              {/* Add reports content here */}
            </div>
          )}
          {activeSection === 'taks-report' && (
            <div>
              <h1 className="text-3xl font-bold text-purple-900">taks-report</h1>
              <Tasks/>
            </div>
          )}
          {activeSection === 'setting' && (
            <div className="overflow-auto h-3/4">
              <Suspense fallback={<p>Loading setting...</p>}>
                <Chatroom />
              </Suspense>
            </div>
          )}
        </div>
      </div>      
    </>
  );
}

export default Dashboard;