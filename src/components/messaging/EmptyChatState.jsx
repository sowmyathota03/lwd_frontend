import React from 'react';

const EmptyChatState = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-slate-900 p-8 text-center h-full">
            <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl text-blue-600 dark:text-blue-400">💬</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Your messages
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 max-w-xs mx-auto">
                Select a conversation from the list or start a new one to begin messaging.
            </p>
        </div>
    );
};

export default EmptyChatState;
