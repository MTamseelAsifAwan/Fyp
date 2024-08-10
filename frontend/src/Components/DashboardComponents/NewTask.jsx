import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firestore, auth ,database} from "../../Auth/Firebase.jsx";
import { ref, push, set, serverTimestamp,get } from 'firebase/database'; // Import necessary functions from Firebase Realtime Database

const NewTask = ({ closeModalTask }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [projectData, setProjectData] = useState([]);
  const [projectId, setProjectId] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // Create a reference to the 'Tasks' node under the current project in the Realtime Database
      const taskRef = ref(database, `users/${auth.currentUser.uid}/Projects/${projectId}/Tasks`);
  
      // Push a new task under this reference, generating a unique key
      const newTaskRef = push(taskRef);
  
      // Set the task data at the new reference
      await set(newTaskRef, {
        name: taskName,
        description: description,
        duration: duration,
        createdAt: serverTimestamp(), // Or use Date.now() or new Date().toISOString()
      });
  
      // Show success message
      toast.success('Task created successfully!');
      
      // Clear input fields
      setTaskName('');
      setDescription('');
      setDuration('');
  
      // Close the modal after successful task creation
      closeModalTask();
    } catch (error) {
      console.log('Error while submitting data', error);
    }
  };

  const displayProjectData = async () => {
    try {
      // Create a reference to the 'Projects' node for the current user
      const projectsRef = ref(database, `users/${auth.currentUser.uid}/Projects`);
  
      // Fetch the data at the reference
      const snapshot = await get(projectsRef);
  
      if (snapshot.exists()) {
        // Map the data to include the id for each project
        const dataItems = Object.entries(snapshot.val()).map(([id, data]) => ({ ...data, id }));
  
        // Set the project data to state
        setProjectData(dataItems);
  
        // Set the first project id to the state variable if there are projects
        if (dataItems.length > 0) {
          setProjectId(dataItems[0].id); // Set the first project id to the state variable
        }
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.log('Error fetching project data:', error);
    }
  };

  useEffect(() => {
    displayProjectData();
  }, []);

  return (
    <>
      <div className="p-4 w-96 bg-white rounded-md">
        <h2 className="font-bold text-2xl text-purple-900 text-center mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold text-sm text-black block mb-1">Task Name</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 text-sm w-full"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter Task Name"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-sm text-black block mb-1">Description</label>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 text-sm w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Description"
              required
            />
          </div>
          <div>
            <label className="font-semibold text-sm text-black block mb-1">Project</label>
            <select
              className="border rounded-lg px-3 py-2 text-sm w-full"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
            >
              <option value="" disabled>Select a project</option>
              {projectData.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-semibold text-sm text-black block mb-1">Target Duration</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 text-sm w-full"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Duration"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="py-2 px-4  rounded-md border border-purple-900  w-24 text-purple-900 font-serif hover:font-bold hover:bg-purple-950 hover:text-white"
              onClick={closeModalTask} // Add a close button
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-purple-900 text-white rounded-md w-24 hover:bg-purple-950 hover:font-semibold"
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default NewTask;
