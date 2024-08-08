import React, { useState,useEffect } from 'react';
import formside from '../../assets/formside.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeNavbar from './HomeNavbar';
import { firestore,auth } from "../../Auth/Firebase.jsx";
import { collection,  addDoc,getDocs,serverTimestamp  } from "firebase/firestore";

const NewTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [ProjectData,setProjectData] =useState([]);
  const [ProjectId,setProjectId]=useState('');

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    try {
        await addDoc(collection(firestore, `users/${auth.currentUser.uid}/Projects/${ProjectId}/Tasks`), {
          name: taskName,
          description: description,
          duration: duration,
          createdAt: serverTimestamp() // Use Firestore's serverTimestamp function to automatically set the timestamp
        });
         toast.success('Task created successfully!')
            setTaskName('');
            setDescription('');
            setDuration('');
      } catch (error) {
        console.log('Error while submitting data', error);
      }


  };
  const displayProjectData = async () => {
    try {
      const response = await getDocs(collection(firestore, `users/${auth.currentUser.uid}/Projects`));
      const dataItems = response.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setProjectData(dataItems);
  
      // Example of accessing the id of the first project
      if (dataItems.length > 0) {
        const firstProjectId = dataItems[0].id;
        setProjectId(firstProjectId); // Set the first project id to the state variable
      }
  
    //   setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.log('Error fetching project data:', error);
    }
  };
  
  
  useEffect(() => {
    displayProjectData();
  }, []);

  return (
    <>
    <HomeNavbar />
      <div className="relative">
        {/* Background Image with Opacity Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-70"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-50 w-screen h-screen">
          <div className="hidden sm:block lg:w-full  md:w-[100%]">
            <img src={formside} alt="Form side" className="object-cover w-full h-full" />
          </div>
          <div className="flex items-center justify-center p-4 sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="relative w-full max-w-md mx-auto space-y-6"
            >
              <div className="font-serif justify-center grid grid-cols-1 items-center text-center flex-col sm:px-4 md:px-8 lg:px-12 bg-cover bg-center">
                <h2 className="font-bold text-2xl sm:text-3xl text-purple-900 text-center">
                  Sprinty <br/> Create New Task
                </h2>
              </div>
              <div className="space-y-4">
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
    value={ProjectData}
    onChange={(e) => setProjectData(e.target.value)}
    required
  >
    <option value="" disabled>Select a project</option>
    { ProjectData.map(project => (
      <option key={project.id} value={project.id}>
        {project.name} {/* Adjust the property name according to your data structure */}
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
              </div>
              <div className="space-y-4">
                <div className="mt-4">
                  <button
                    className="py-2 px-4 bg-purple-900 hover:bg-purple-950 focus:ring-purple-900 text-white w-full transition ease-in duration-200 text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* ToastContainer for showing notifications */}
      <ToastContainer />
    </>
  );
};
export default NewTask;
