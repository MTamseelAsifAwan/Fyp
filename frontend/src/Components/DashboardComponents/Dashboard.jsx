import React, { useState, lazy, Suspense } from 'react';
import HomeNavbar from './HomeNavbar.jsx';
import Teammembers from './Teammembers.jsx';

// Correct lazy loading syntax
const Projecthome = lazy(() => import('./Projecthome.jsx'));

function Dashboard() {
  const [openTab, setOpenTab] = useState(1);

  return (
    <>
      <HomeNavbar />
      <div className='p-6'>
        <h1 className="text-3xl font-bold text-purple-900 ">Project Details</h1>
        <p>
          <span className="font-bold">Project Name:</span> Project Name
        </p>
        <p>
          <span className="font-bold">Project Description:</span> This project involves task management for freelancers.
        </p>
        <div className="grid justify-end">
          <button className="w-28 text-base font-serif text-white bg-purple-900 border-none rounded-md hover:bg-purple-950 hover:font-bold">
            New Project
          </button>
        </div>
        <div className="flex w-1/3 mb-4 space-x-4 p-2 bg-gray-100 rounded-lg shadow-md">
          <button
            onClick={() => setOpenTab(1)}
            className={`flex-1 py-2 px-4 text-sm rounded-md transition-all duration-300 ${
              openTab === 1 ? 'bg-purple-900 text-white font-bold' : 'bg-gray-200 text-black'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setOpenTab(2)}
            className={`flex-1 py-2 px-4 text-sm rounded-md transition-all duration-300 ${
              openTab === 2 ? 'bg-purple-900 text-white font-bold' : 'bg-gray-200 text-black'
            }`}
          >
            Members
          </button>
        </div>
        {openTab === 1 && (
          <Suspense fallback={<p>Loading...</p>}>
            <Projecthome />
          </Suspense>
        )}
        {openTab === 2 && <Teammembers />}
        <p>{openTab !== 1 && openTab !== 2 && 'Invalid tab'}</p>
      </div>
    </>
  );
}

export default Dashboard;
