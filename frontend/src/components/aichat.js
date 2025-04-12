// src/components/AIChat.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const LoadingSpinner = () => (
  <div
    style={{
      width: '16px',
      height: '16px',
      border: '2px solid #ffffff',
      borderTopColor: 'transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }}
  />
);

const AIChat = () => {
  const navigate = useNavigate();

  // Keep track of the user’s typed message
  const [userMessage, setUserMessage] = useState('');

  // Keep track of all messages in the chat (both user & AI)
  const [messages, setMessages] = useState([]);
  
  // Manage loading state during each request
  const [loading, setLoading] = useState(false);
  
  // Handle any error messages
  const [error, setError] = useState(null);

  // Send message to the new /api/chat_with_gemini endpoint
  const handleSendMessage = async () => {
    const trimmedMessage = userMessage.trim();
    if (!trimmedMessage) return;

    // Add user's message to chat
    const newMessages = [...messages, { role: 'user', content: trimmedMessage }];
    setMessages(newMessages);
    setUserMessage('');
    setLoading(true);
    setError(null);

    try {
        const response = await axios.post(
            'http://localhost:8000/api/chat_with_gemini/',
            { prompt: trimmedMessage },
            {
                headers: { 'Content-Type': 'application/json' }
                // Removed withCredentials: true
            }
        );

        const aiReply = response.data?.reply || 'No response';
        setMessages([...newMessages, { role: 'assistant', content: aiReply }]);
    } catch (err) {
        console.error('Error details:', err.response || err);
        setError(err.response?.data?.error || 'Failed to get AI response. Please try again.');
    } finally {
        setLoading(false);
    }
  };

  // Renders messages in a simple chat-bubble style
  const renderMessages = () =>
    messages.map((msg, index) => {
      const isUser = msg.role === 'user';
      return (
        <div
          key={index}
          style={{
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            backgroundColor: isUser ? '#1DB954' : 'var(--bg-tertiary)',
            color: isUser ? '#fff' : 'var(--text-primary)',
            padding: '12px',
            borderRadius: '12px',
            marginBottom: '8px',
            maxWidth: '70%',
            wordWrap: 'break-word',
          }}
        >
          {msg.content}
        </div>
      );
    });

  const content = (
    <div
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <h1
          style={{
            color: '#1DB954',
            fontSize: '24px',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          AI Chat
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          Back to Dashboard
        </button>
      </div>

      {/* Chat Display */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--bg-secondary)',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          height: '60vh',
          overflowY: 'auto',
          marginBottom: '16px',
        }}
      >
        {renderMessages()}
      </div>

      {/* Error Message */}
      {error && (
        <div
          style={{
            backgroundColor: 'rgba(255,68,68,0.1)',
            border: '1px solid #ff4444',
            color: '#ff4444',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '16px',
          }}
        >
          {error}
        </div>
      )}

      {/* Input + Send Button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <input
          type="text"
          placeholder="PLEASE TYPE HERE"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          style={{
            flex: 1,
            padding: '12px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            outline: 'none',
          }}
        />
        <button
          onClick={handleSendMessage}
          disabled={loading}
          style={{
            backgroundColor: '#1DB954',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '20px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {loading ? (
            <>
              <LoadingSpinner />
              <span>Sending...</span>
            </>
          ) : (
            'Send'
          )}
        </button>
      </div>
    </div>
  );

  return <Layout>{content}</Layout>;
};

export default AIChat;
