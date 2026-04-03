import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ConversationList from '../../components/messaging/ConversationList';
import ChatWindow from '../../components/messaging/ChatWindow';

const MOCK_CONVERSATIONS = [
    {
        id: '1',
        name: 'John Doe',
        avatar: null,
        lastMessage: 'Hey, I saw your job application. Let\'s talk!',
        time: '10:30 AM',
        unread: 2,
        online: true
    },
    {
        id: '2',
        name: 'Tech Solutions Inc.',
        avatar: null,
        lastMessage: 'When are you available for an interview?',
        time: 'Yesterday',
        unread: 0,
        online: false
    },
    {
        id: '3',
        name: 'Sarah Williams',
        avatar: null,
        lastMessage: 'Thanks for the feedback!',
        time: 'Mar 28',
        unread: 0,
        online: true
    }
];

const MessagingPage = () => {
    const { user } = useContext(AuthContext);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const { messages: socketMessages, sendSocketMessage } = useMessagingSocket(selectedConversation?.id);
    const [allMessages, setAllMessages] = useState({});

    const handleSendMessage = (text) => {
        if (!selectedConversation) return;

        const newMessage = {
            id: Date.now(),
            text,
            sender: 'ME',
            timestamp: new Date().toISOString()
        };

        setAllMessages(prev => ({
            ...prev,
            [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMessage]
        }));
        
        // In a real app, this would also call sendSocketMessage
        // sendSocketMessage(text);
    };

    const currentMessages = allMessages[selectedConversation?.id] || [];

    return (
        <div className="flex h-screen w-full bg-gray-50 dark:bg-slate-900 overflow-hidden">
            {/* Conversations Sidebar */}
            <div className={`
                ${selectedConversation ? 'hidden md:flex' : 'flex'} 
                w-full md:w-80 h-full transition-all duration-300
            `}>
                <ConversationList 
                    conversations={MOCK_CONVERSATIONS} 
                    activeId={selectedConversation?.id}
                    onSelect={setSelectedConversation}
                />
            </div>

            {/* Chat Window */}
            <div className={`
                ${selectedConversation ? 'flex' : 'hidden md:flex'} 
                flex-1 h-full flex flex-col relative
            `}>
                {selectedConversation && (
                    <button 
                        onClick={() => setSelectedConversation(null)}
                        className="md:hidden absolute top-4 left-4 z-20 p-2 bg-white dark:bg-slate-800 rounded-full shadow-md text-gray-600 dark:text-gray-300"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}
                
                <ChatWindow 
                    conversation={selectedConversation}
                    messages={currentMessages}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default MessagingPage;
