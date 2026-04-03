import React from 'react';

const MessageBubble = ({ message, isMe }) => {
    return (
        <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`
                    max-w-[70%] p-3 rounded-2xl shadow-sm text-sm
                    ${isMe 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-slate-700'
                    }
                `}
            >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <div className={`text-[10px] mt-1 opacity-70 flex items-center justify-end gap-1`}>
                    <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {isMe && <span>✓✓</span>}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
