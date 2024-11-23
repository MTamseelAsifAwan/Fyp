import React, { useEffect, useState,useRef  } from 'react';
import { FaTasks, FaClipboardList, FaHourglassStart, FaCheckCircle, FaCaretUp, FaSortDown } from 'react-icons/fa'; // Import icons
import MyProjectContext from './context/context'; // Import the context
import axios from 'axios';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { PieChart, Pie, Cell, Label } from 'recharts';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

const Projecthome = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectTasks, setProjectTasks] = useState([]);
  const [error, setError] = useState(null);
  const [totaltodo, settodo] = useState(0);
  const [totalinprogress, setinprogress] = useState(0);
  const [totaldone, setotaldone] = useState(0);
  const [projectId, setProjectId] = useState('');
  const [projectData, setProjectData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const[selectedProjectname,setSelectedProjectname]=useState(null);
  const [selectedProjectmethodology,setSelectedProjectmethodology]=useState(null);
  const dropdownMenuRef = useRef();
  const btnref = useRef();
  const [totalTasks, setTotalTasks] = useState(0);

  const [taskSummary, setTaskSummary] = useState({
    toDo: 0,
    inProgress: 0,
    done: 0,
    percentages: {},
  });

  const processIssuesData = (issues) => {
    const categoryCounts = {
      toDo: 0,
      inProgress: 0,
      done: 0,
    };

    const processedData = issues.map((issue) => {
      const statusCategory = issue.fields.status?.statusCategory?.name || 'Unknown';
      const priority = issue.fields.priority?.name || 'None'; // Get the priority value
      let progressPercentage = 0;

      if (statusCategory.trim().toLowerCase() === 'to do') {
        progressPercentage = 15;
        categoryCounts.toDo += 1;
      } else if (statusCategory.trim().toLowerCase() === 'in progress') {
        progressPercentage = 50;
        categoryCounts.inProgress += 1;
      } else if (statusCategory.trim().toLowerCase() === 'done') {
        progressPercentage = 100;
        categoryCounts.done += 1;
      }

      const totalTasks =
        categoryCounts.toDo + categoryCounts.inProgress + categoryCounts.done;

      setTotalTasks(totalTasks);
      settodo(categoryCounts.toDo);
      setinprogress(categoryCounts.inProgress);
      setotaldone(categoryCounts.done);

      return {
        name: issue.fields.summary || 'Unknown',
        progress: progressPercentage,
        status: statusCategory,
        priority, // Add priority to the task
        statusCategory,
      };
    });

    const totalTasks =
      categoryCounts.toDo + categoryCounts.inProgress + categoryCounts.done;

    const percentages = {
      toDo: ((categoryCounts.toDo / totalTasks) * 100).toFixed(2),
      inProgress: ((categoryCounts.inProgress / totalTasks) * 100).toFixed(2),
      done: ((categoryCounts.done / totalTasks) * 100).toFixed(2),
    };

    setTaskSummary({ ...categoryCounts, percentages });
    return processedData;
  };

  const fetchTasks = async (projectId) => {
    const storedProjectId = localStorage.getItem('selectedProjectId') || projectId;

    if (storedProjectId) {
      try {
        // Use the stored or provided projectId
        const response = await axios.get(`http://localhost:4000/api/tasks?projectId=${storedProjectId}`);

        // Extract and process the data
        const issues = response.data.issues;
        const processedData = processIssuesData(issues);
        // Update state and local storage
        setProjectTasks(processedData);
        setIsLoading(false);
        localStorage.setItem('projectTasks', JSON.stringify(processedData));
        setProjectId(storedProjectId); // Ensure projectId is updated
      } catch (err) {
        toast.error('Error fetching data! Please check your internet connection.');
        console.error('Error fetching data:', err);

        const storedData = localStorage.getItem('projectTasks');
        if (storedData) {
          setProjectTasks(JSON.parse(storedData));
          setIsLoading(false);
        }
      }
    } else {
      toast.error('Please select a project to view tasks');
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target) &&
        btnref.current &&
        !btnref.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setSelectedProjectname(project.name); // Set project name directly
    setSelectedProjectmethodology(project.key); // Set methodology directly
    setProjectId(project.id);
    setShowDropdown(false);

    // Fetch tasks for the selected project
    fetchTasks(project.id);

    // Optionally, store these in localStorage
    localStorage.setItem('selectedProjectId', project.id);
    localStorage.setItem('selectedProjectname', project.name);
    localStorage.setItem('selectedProjectmethodology', project.key);
  };


  const fetchProjects = async () => {

    try {
      const response = await axios.get('http://localhost:4000/api/projects');
      setProjectData(response.data); // Save project data
    } catch (err) {
      toast.error('Failed to fetch projects.');
      console.error('Error fetching projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch all projects on component mount

    const storedProjectId = localStorage.getItem('selectedProjectId');
 
    // Set initial state values
 
    if (storedProjectId) {
      fetchTasks(storedProjectId); // Fetch tasks if project ID exists in localStorage
    }
  }, []); // Run only once when the component is mounted

// Watch for changes in selectedProjectname
useEffect(() => {
  fetchProjects();

  // Check if there is a selected project in localStorage on initial load
  const storedProjectId = localStorage.getItem('selectedProjectId');
  if (storedProjectId) {
    const storedProjectname = localStorage.getItem('selectedProjectname');
    const storedProjectmethodology = localStorage.getItem('selectedProjectmethodology');
    setSelectedProjectname(storedProjectname);
    setSelectedProjectmethodology(storedProjectmethodology);
    fetchTasks(storedProjectId); // Fetch tasks for the stored project
  }
}, []); // Empty dependency array, this runs once when the component mounts

  useEffect(() => {
    if (projectId) {
      fetchTasks(projectId); // Fetch tasks only when projectId changes
    }
  }, [projectId]);

  const pieChartData = [
    { name: 'To Do', value: taskSummary.toDo, priority: 'Low' }, // Low priority for ToDo
    { name: 'In Progress', value: taskSummary.inProgress, priority: 'Medium' }, // Medium priority for In Progress
    { name: 'Done', value: taskSummary.done, priority: 'High' }, // High priority for Done
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, progress, priority } = payload[0].payload; // Extract name, progress, and priority
      return (
        <div
          className="custom-tooltip"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#f8f8ff',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <p className="label">{`Issue: ${name}`}</p>
          <p className="label">{`Progress: ${progress}%`}</p>
          <p className="label">{`Priority: ${priority}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="h-screen flex flex-col">
      {/* Main Project Details Section */}
      <div className="flex flex-col lg:flex-row h-full p-6">
        {/* Left Panel with Project Details */}
        <div className="flex-1">
  <h1 className="text-3xl font-bold text-white">Project Details</h1>

  {selectedProjectname && selectedProjectmethodology ? (
    <div className="text-white">
      <p>
        <span className="font-bold">Project Name:</span> {selectedProjectname}
      </p>
      <p>
        <span className="font-bold">Project Methodology:</span> {selectedProjectmethodology}
      </p>
    </div>
  ) : (
    <p className="text-white">Please select a project to see the details.</p>
  )}

  {/* Grid of task info boxes */}
  <div className="grid grid-cols-4 gap-4 mt-6">
    <TaskInfoBox
      title="Total Tasks"
      value={totalTasks}
      icon={<FaTasks className="text-4xl text-yellow-500" />}
    />
    <TaskInfoBox
      title="To Do Tasks"
      value={totaltodo}
      icon={<FaClipboardList className="text-4xl text-yellow-500" />}
    />
    <TaskInfoBox
      title="In Progress Tasks"
      value={totalinprogress}
      icon={<FaHourglassStart className="text-4xl text-yellow-500" />}
    />
    <TaskInfoBox
      title="Done Tasks"
      value={totaldone}
      icon={<FaCheckCircle className="text-4xl text-yellow-500" />}
    />
  </div>
</div>


        {/* Right Panel with Dropdown and Select Project */}
        <div className="flex-shrink-0 mt-6 lg:mt-0 lg:ml-4 relative">
          <button
            className="flex items-center w-[9rem] pl-2 text-base mt-14 font-serif text-white bg-purple-900 border-none rounded-md hover:bg-purple-950"
            onClick={toggleDropdown}
            ref={btnref}
          >
            Select Project
            {showDropdown ? <FaCaretUp className="ml-1" /> : <FaSortDown className="ml-1" />}
          </button>

          {showDropdown && (
            <div
              ref={dropdownMenuRef}
              className="absolute right-0 mt-2 h-36 w-48 p-4 bg-white border border-gray-300 rounded-lg shadow-lg overflow-auto"
            >
              <ul className="grid gap-2">
                {projectData.length > 0 ? (
                  projectData.map((project) => (
                    <li
                      key={project.id}
                      onClick={() => handleProjectSelect(project)}
                      className="px-4 py-2 text-center bg-gray-100 text-gray-900 hover:bg-gray-200 rounded-lg cursor-pointer"
                    >
                      {project.name || "Unnamed Project"}
                    </li>
                  ))
                ) : (
                  <li className="text-center text-gray-500">No projects found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className=" ">
          <div className="bg-gray-300 h-64 w-full rounded-md animate-pulse mb-20">
          <p className="flex items-center justify-center h-full font-serif font font-bold">
  Please Select Project
</p>

          </div>
        </div>
      ) : (
        <>
          {/* Main Graph Section */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 mt-4">
            <div className="col-span-4">
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <ResponsiveContainer>
                  <ComposedChart
                    data={projectTasks}
                    margin={{
                      top: 0,
                      right: 20,
                      bottom: 2,
                      left: 2,
                    }}
                  >
                    <CartesianGrid stroke="#1c2d41" />
                    <XAxis stroke="#fffafa" dataKey="name" />
                    <YAxis stroke="#fffafa" domain={[0, 100]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="progress"
                      fill="#e6e6fa"
                      stroke="#32cd32"
                    />
                    <Bar dataKey="progress" barSize={20} style={{ fill: "#800080" }} />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Right Panel with Pie Chart */}
            <div className="col-span-1 flex flex-col items-center">
              <h1 className="text-2xl font-bold text-white mb-5">Total Progress</h1>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="55%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.priority === "High"
                            ? "#32cd32"
                            : entry.priority === "Medium"
                            ? "#FFBB28"
                            : "#FF0000"
                        }
                      />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const TaskInfoBox = ({ title, value, icon }) => (
  <div className="flex flex-col items-center h-36 w-48 cursor-pointer transition-all duration-500 hover:translate-y-2 text-white bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl">
    {icon}
    <span className="text-lg font-semibold">{title}</span>
    <span className="text-3xl font-bold text-green-600 mt-2">{value}</span>
  </div>
);

export default Projecthome;