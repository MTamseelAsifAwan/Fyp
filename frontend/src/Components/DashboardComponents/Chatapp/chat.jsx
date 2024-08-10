import React, { useState, useCallback } from 'react';
import HomeNavbar from '../HomeNavbar';
import Chatwindow from './Chatwindow';

const Chat = () => {
  return (
    <>
      <HomeNavbar />
      <Chatwindow />
    </>
  );
};

export default Chat;