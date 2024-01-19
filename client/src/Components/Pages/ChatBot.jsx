import React, { useState, useEffect } from 'react';

const ChatBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const runChatbot = async (userInput) => {
        try {
            // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
            const response = await fetch('http://127.0.0.1:8080/getResponse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userInput }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response from the server');
            }

            const result = await response.json();
            return result.answer; // Adjust based on the structure of your API response
        } catch (error) {
            console.error('Error fetching response from the server:', error.message);
            return 'An error occurred while processing your request.';
        }
    };

    const handleSend = async () => {
        if (input) {
            const userMessage = { text: input, sender: 'user' };
            setMessages([...messages, userMessage]);
            setInput('');

            // Get the bot's response
            const botResponse = await runChatbot(input);

            // Update the messages state with the bot's response
            const botMessage = { text: botResponse, sender: 'HelpBot' };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        }
    };

    return (
        <div className="flex flex-col h-[500px] mx-24 border-1 shadow-md rounded-xl bg-slate-200">
            <h1 className="text-3xl font-bold m-4 text-center">Disaster HelpBot</h1>
            <div className="overflow-auto p-4 flex-grow text-xl">
                {messages.map((message, index) => (
                    <div key={index} className={`mb-4 p-2 rounded ${message.sender === 'user' ? 'bg-blue-200 ml-auto w-fit p-2' : 'bg-green-200 mr-auto w-fit p-2'}`}>
                        <strong>{message.sender}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <div className="p-4 flex-none">
                <div className="flex">
                    <input
                        className="flex-grow rounded p-2 border-1 border-slate-950"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend(e)}
                    />
                    <button className="ml-2 px-4 py-2 rounded bg-blue-500 text-white" onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;
