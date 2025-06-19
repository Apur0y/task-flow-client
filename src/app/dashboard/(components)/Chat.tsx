import React, { useState, useEffect, useRef } from 'react';

import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import axios, { all } from 'axios'; // Added for HTTP request
import { useRouter } from 'next/navigation';
import { useGetAllTeamQuery } from '@/feature/team/teamApi';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/feature/auth/authSelectors';
import { Team } from './admin-control/(components)/TeamSection';

function Chat() {
  const navigate = useRouter()
  interface MessageData {
    sender: string;
    message: string;
    timestamp: string | number | Date;
  }
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamNameInput, setTeamNameInput] = useState('');
  const socketRef = useRef<any>(null);
  const accessToken = localStorage.getItem('accessToken');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {data:allTeam} = useGetAllTeamQuery({});
 const auth = useSelector(selectAuth)

  useEffect(() => {
    if (!accessToken) {
      navigate.push('/');
      return;
      
    }

    socketRef.current = io('http://localhost:5100', {
      withCredentials: true,
      auth: {
        token: accessToken,
      },
      transports: ['websocket', 'polling'],
    });

    const socket = socketRef.current;

    if (teamName) {
      socket.emit('joinRoom', teamName);
    }

    interface MessageData {
      sender: string;
      message: string;
      timestamp: string | number | Date;
    }

    socket.on('receiveMessage', (data: MessageData) => {
      console.log("Received message:", data); // Debug log
      setMessages((prevMessages: MessageData[]) => [...prevMessages, data]);
    });

    return () => {
      if (teamName && socket.connected) {
        socket.emit('leaveRoom', teamName);
      }
      socket.disconnect();
    };
  }, [teamName, accessToken, navigate]);

  useEffect(() => {

    if(allTeam?.data){
        const myTeam= allTeam.data
       const me  = auth.userEmail;
    const userTeams = myTeam?.filter((team: Team) =>
  team.teamLeaderEmail === me ||
  team.teamColeaderEmail === me ||
  team.teamMembersEmails?.includes(me ?? ''));
 setTeamNameInput(userTeams[0]?.teamName)
 setTeamName(userTeams[0]?.teamName)
}


    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages,allTeam?.data]);
 

  const handleSetTeamName = async () => {
    if (teamNameInput.trim()) {
      // Create chatroom before joining
      try {
        const response = await axios.post(
          'http://localhost:5100/api/chat/',
          { teamName: teamNameInput },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        console.log("Chatroom created:", response.data);
        setTeamName(teamNameInput); // Join the room only after successful creation
      } catch (error) {
        console.error("Failed to create chatroom:", error);
        // Optionally handle error (e.g., alert user or allow joining anyway)
        setTeamName(teamNameInput); // Allow joining even if chat creation fails
      }
    }
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && accessToken && teamName) {
      interface DecodedToken {
        userEmail?: string;
        [key: string]: any;
      }
      const decodedToken = jwtDecode<DecodedToken>(accessToken);
      const senderEmail = decodedToken.userEmail || 'unknown@taskflow.com';
      const messageData = {
        teamName,
        senderEmail,
        message: messageInput,
      };

      socketRef.current.emit('sendMessage', messageData);
      setMessageInput('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate.push('/');
  };

  return (
    <div style={{ padding: '30px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Group Chat - {teamName || 'Select a Team'}</h2>
      {/* <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={teamNameInput}
          onChange={(e) => setTeamNameInput(e.target.value)}
          placeholder="Enter team name..."
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }}
        />
        <button onClick={handleSetTeamName} style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Join Team
        </button>
      </div> */}
      <button onClick={handleLogout} style={{ marginBottom: '20px', padding: '5px 10px' }}>Logout</button>

      <div style={{ height: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px', marginBottom: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '5px', backgroundColor: '#e0e0e0', borderRadius: '5px', maxWidth: '70%', wordWrap: 'break-word' }}>
            <strong>{msg.sender}:</strong> {msg.message}
            <div style={{ fontSize: '0.8em', color: '#666' }}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: '1', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          disabled={!teamName}
        />
        <button onClick={handleSendMessage} style={{ padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} disabled={!teamName}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;