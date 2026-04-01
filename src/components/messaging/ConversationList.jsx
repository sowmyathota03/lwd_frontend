import React from 'react';

const ConversationList = ({ conversations, activeId, onSelect }) => {
    return (
        <div className="flex flex-col h-full bg-white dark:bg-slate-800 border-r border-gray-100 dark:border-slate-700 w-full md:w-80 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800/50">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-1 p-2">
                {conversations.length === 0 ? (
                    <div className="text-center py-10 text-gray-400 text-sm italic">
                        No conversations yet
                    </div>
                ) : (
                    conversations.map((conv) => (
                        <button
                            key={conv.id}
                            onClick={() => onSelect(conv)}
                            className={`
                                w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300
                                ${activeId === conv.id 
                                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 shadow-sm' 
                                    : 'hover:bg-gray-50 dark:hover:bg-slate-700/50 border-l-4 border-transparent'
                                }
                            `}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-slate-600 flex items-center justify-center text-gray-500 dark:text-gray-300 font-bold overflow-hidden shadow-sm">
                                    {conv.avatar ? (
                                        <img src={conv.avatar} alt={conv.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{conv.name.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                                {conv.online && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full shadow-sm"></span>
                                )}
                            </div>
                            
                            <div className="flex-1 text-left min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-gray-900 dark:text-white truncate text-sm">
                                        {conv.name}
                                    </h4>
                                    <span className="text-[10px] text-gray-400 font-medium">
                                        {conv.time}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate pr-2">
                                    {conv.lastMessage}
                                </p>
                            </div>
                            
                            {conv.unread > 0 && (
                                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md animate-pulse">
                                    {conv.unread}
                                </span>
                            )}
                        </button>
                    ))
                )}
            </div>
        </div>
    );
};

export default ConversationList;
