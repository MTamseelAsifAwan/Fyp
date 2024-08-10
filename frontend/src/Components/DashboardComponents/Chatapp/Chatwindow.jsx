import React, { useState, useCallback } from 'react';

const Sidebar = ({ onSelectUser }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuClick = useCallback(() => {
    setMenuVisible(prevState => !prevState);
  }, []);

  const handleOutsideClick = useCallback((e) => {
    if (!e.target.closest('#menuDropdown') && !e.target.closest('#menuButton')) {
      setMenuVisible(false);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [handleOutsideClick]);

  return (
    <div className="w-1/4 bg-white border-r border-gray-300">
      {/* Sidebar Header */}
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Chat Web</h1>
        <div className="relative">
          <button id="menuButton" className="focus:outline-none" onClick={handleMenuClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-100" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
            </svg>
          </button>
          {/* Menu Dropdown */}
          {menuVisible && (
            <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
              <ul className="py-2 px-3">
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
                {/* Add more menu options here */}
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Contact List */}
      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
        {[
          { name: 'Alice', message: 'Hoorayy!!', avatar: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
          { name: 'Martin', message: 'That pizza place was amazing! We should go again sometime. 🍕', avatar: 'https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
          // Add more contacts here
        ].map((contact, index) => (
          <div key={index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => onSelectUser(contact.name)}>
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img src={contact.avatar} alt={`${contact.name} Avatar`} className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{contact.name}</h2>
              <p className="text-gray-600">{contact.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatArea = ({ user, messages }) => (
  <div className="flex-1">
    {/* Chat Header */}
    <header className="bg-white p-4 text-gray-700">
      <h1 className="text-2xl font-semibold">{user}</h1>
    </header>

    {/* Chat Messages */}
    <div className="h-screen overflow-y-auto p-4 pb-36">
      {messages.map((message, index) => (
        <div key={index} className={`flex mb-4 cursor-pointer ${message.type === 'outgoing' ? 'justify-end' : ''}`}>
          {message.type === 'incoming' && (
            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
              <img src={message.avatar} alt={`${message.sender} Avatar`} className="w-8 h-8 rounded-full" />
            </div>
          )}
          <div className={`flex max-w-96 rounded-lg p-3 gap-3 ${message.type === 'incoming' ? 'bg-white text-gray-700' : 'bg-indigo-500 text-white'}`}>
            <p>{message.text}</p>
          </div>
          {message.type === 'outgoing' && (
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <img src={message.avatar} alt="My Avatar" className="w-8 h-8 rounded-full" />
            </div>
          )}
        </div>
      ))}
    </div>

    {/* Chat Input */}
    <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
      <div className="flex items-center">
        <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
      </div>
    </footer>
  </div>
);

const Chatwindow = () => {
  const [selectedUser, setSelectedUser] = React.useState('Alice');
  const [messages, setMessages] = React.useState([
    { type: 'incoming', sender: 'Alice', text: "Hey Bob, how's it going?", avatar: 'https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
    { type: 'outgoing', text: "Hi Alice! I'm good, just finished a great book. How about you?", avatar: 'https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato' },
    // Add more messages here
  ]);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onSelectUser={setSelectedUser} />
      <ChatArea user={selectedUser} messages={messages} />
    </div>
  );
};

export default Chatwindow;
