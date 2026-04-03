import React, { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageBubble from './MessageBubble';
import EmptyChatState from './EmptyChatState';

const ChatWindow = ({ conversation, messages, onSendMessage }) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    if (!conversation) {
        return <EmptyChatState />;
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 border-l border-gray-100 dark:border-slate-800 shadow-xl overflow-hidden relative">
            <ChatHeader conversation={conversation} />
            
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50/30 dark:bg-slate-900/50">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 transition-all duration-300">
                             <span className="text-2xl opacity-50">✉️</span>
                        </div>
                        <p className="text-sm font-medium">No messages yet. Say hello!</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <MessageBubble 
                            key={msg.id} 
                            message={msg} 
                            isMe={msg.sender === 'ME'} 
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
};

export default ChatWindow;
