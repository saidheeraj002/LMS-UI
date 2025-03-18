import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUserQueryAnswer } from '../services/chat_service';
import { v4 as uuidv4 } from 'uuid';


function ChatInterface() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subject = JSON.parse(decodeURIComponent(searchParams.get('subject')));
  const topic = decodeURIComponent(searchParams.get('topic'));
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    // Generate unique ID on component mount (when navigating to /chat)
    const uniqueId = uuidv4();
    setChatId(uniqueId);
  }, []);


  const [messages, setMessages] = useState([
    {
      text: 'Can you explain how to solve quadratic equations?',
      sender: 'user',
    },
    {
      text: 'Let me help you understand quadratic equations. A quadratic equation is in the form ax² + bx + c = 0. There are several methods to solve them:',
      sender: 'ai',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const request_body = {subject: subject, topic: topic, query: newMessage, window_id: chatId}
      console.log("newMessage", newMessage);
      setMessages((messages) => [...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
      const queryAnswer = await getUserQueryAnswer(request_body);
      console.log("queryAnswer", queryAnswer.response);
      setTimeout(() => {
        setMessages((messages) => [
          ...messages,
          { text: queryAnswer.response, sender: 'ai' },
        ]);
      }, 500);
    }
  };



  return (
    <div className="h-full text-base-content w-screen">
      <div id="chat-interface" className="flex min-h-screen bg-neutral-50">
      <div id="sidebar" className="w-64 bg-white border-r border-neutral-200 flex flex-col">
          <div className="p-4 border-b border-neutral-200">
            <div className="flex items-center space-x-3">
              <img
                src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=123"
                className="w-10 h-10 rounded-full"
                alt="User Avatar"
              />
              <div>
                <h2 className="text-sm">John Smith</h2>
                <p className="text-xs text-neutral-500">Student</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-xs uppercase text-neutral-500 mb-3">Recent Chats</h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-neutral-100 cursor-pointer hover:bg-neutral-200">
                <p className="text-sm">Mathematics - Algebra</p>
                <p className="text-xs text-neutral-500">Last active: 2 hrs ago</p>
              </div>
              <div className="p-3 rounded-lg bg-neutral-100 cursor-pointer hover:bg-neutral-200">
                <p className="text-sm">Physics - Mechanics</p>
                <p className="text-xs text-neutral-500">Last active: 5 hrs ago</p>
              </div>
              <div className="p-3 rounded-lg bg-neutral-100 cursor-pointer hover:bg-neutral-200">
                <p className="text-sm">Chemistry - Organic</p>
                <p className="text-xs text-neutral-500">Last active: 1 day ago</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-neutral-200">
            <button className="w-full bg-neutral-900 text-white rounded-lg py-2 px-4 flex items-center justify-center space-x-2">
              <FontAwesomeIcon icon={faPlus} />
              <span>New Chat</span>
            </button>
          </div>
        </div>
        <div id="main-chat" className="flex-1 flex flex-col">
          <div className="bg-white border-b border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <div className='flex items-center space-x-4'>
                <a href="/home" className="flex items-center justify-center bg-neutral-100 hover:bg-neutral-200 rounded-lg p-2">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </a>
                <div>
                  <h1 className="text-lg">
                    {subject} - {topic} - Chat ID: {chatId}
                  </h1>
                  <p className="text-sm text-neutral-500">Topic: {topic}</p>
                </div>
              </div>
              <button className="text-neutral-500 hover:text-neutral-700">
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}
              >
                {message.sender === 'ai' && (
                  <img
                    src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=ai"
                    className="w-8 h-8 rounded-full mr-3"
                    alt="AI Avatar"
                  />
                )}
                <div
                  className={`bg-neutral-100 rounded-lg p-3 max-w-lg ${
                    message.sender === 'user' ? 'bg-neutral-900 text-white' : ''
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white border-t border-neutral-200 p-4">
          <div className="flex items-center space-x-3">
              <button className="text-neutral-500 hover:text-neutral-700">
                <FontAwesomeIcon icon={faPaperclip} />
              </button>
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border border-neutral-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button className="bg-neutral-900 text-white rounded-lg p-2" onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;