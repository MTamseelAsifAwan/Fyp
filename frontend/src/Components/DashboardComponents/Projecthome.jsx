import React, { useEffect, useState } from 'react';
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

const Projecthome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectTasks, setProjectTasks] = useState([]);
  const [error, setError] = useState(null);
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

      return {
        name: issue.fields.summary || 'Unknown',
        progress: progressPercentage,
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

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/tasks');
      const issues = response.data.issues;
      const processedData = processIssuesData(issues);
      setProjectTasks(processedData);
      localStorage.setItem('projectTasks', JSON.stringify(processedData)); // Save to local storage
      setIsLoading(false);
    } catch (err) {
      setError('Error fetching data check internet connection');
      console.error('Error fetching data:', err);

      // Use toastify to show the error
      toast.error('Error fetching data! Please check your internet connection.');

      const storedData = localStorage.getItem('projectTasks');
      if (storedData) {
        setProjectTasks(JSON.parse(storedData));
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
    <div className="grid grid-cols-5 gap-0">
      <div className="col-span-4" style={{ width: '100%', height: '400px' }}>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ResponsiveContainer>
            <ComposedChart
              data={projectTasks}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#1c2d41" />
              <XAxis stroke="#fffafa" dataKey="name" />
              <YAxis stroke="#fffafa" domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {/* Progress Line */}
              <Area type="monotone" dataKey="progress" fill="#e6e6fa  " stroke="#32cd32 " />
              {/* Combined Bar for Progress and Priority */}
              <Bar
  dataKey="progress"
  barSize={20}
  style={{ fill: '#800080 ' }} // Set default fill color to green
/>

            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="col-span-1 flex flex-col items-center ">
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
                  fill={entry.priority === 'High' ? '#32cd32' : entry.priority === 'Medium' ? '#FFBB28' : '#FF0000'}
                />
              ))}
            </Pie>
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Projecthome;
