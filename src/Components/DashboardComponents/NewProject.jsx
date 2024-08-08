import React, { useState } from 'react';
import formside from '../../assets/formside.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeNavbar from './HomeNavbar';
import { firestore,auth } from "../../Auth/Firebase.jsx";
import { collection,  addDoc,serverTimestamp  } from "firebase/firestore";

const NewProject = () => {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [type,setType] =useState('');
  const userId = auth.currentUser.uid;
 const handleSubmit = async(event) => {
  event.preventDefault();
  
  try {
    await addDoc(collection(firestore, `users/${userId}/Projects`), {
      name: projectName,
      description: description,
      duration: duration,
      type: type,
      createdAt: serverTimestamp(),
    });
    toast.success('Project created successfully!');
    setProjectName('');
    setDescription('');
    setDuration('');
  } catch (error) {
    console.log('Error adding project', error);
  }
};
  return (
    <>
    <HomeNavbar />
      <div className="relative">
        {/* Background Image with Opacity Overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-70"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 bg-gray-50 w-screen h-screen">
          <div className="hidden sm:block">
            <img src={formside} alt="Form side" className="object-cover w-full h-full" />
          </div>
          <div className="flex items-center justify-center p-4 sm:p-8">
            <form
              onSubmit={handleSubmit}
              className="relative w-full max-w-md mx-auto space-y-6"
            >
              <div className="font-serif justify-center grid grid-cols-1 items-center text-center flex-col sm:px-4 md:px-8 lg:px-12 bg-cover bg-center">
                <h2 className="font-bold text-2xl sm:text-3xl text-purple-900 text-center">
                  Sprinty <br/> Create New Project
                </h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-sm text-black block mb-1">Project Name</label>
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 text-sm w-full"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter Project Name"
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
                  <label className="font-semibold text-sm text-black block mb-1">Project Type</label>
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 text-sm w-full"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    placeholder="Webapp / Mobileapp"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-sm text-black block mb-1">Duration</label>
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
export default NewProject;
