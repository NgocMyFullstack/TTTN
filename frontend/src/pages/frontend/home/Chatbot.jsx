import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Sử dụng prevState để đảm bảo cập nhật đúng

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: input,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY`,
          },
        }
      );

      const botMessage = { sender: "bot", text: response.data.choices[0].text };
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Cập nhật tin nhắn từ bot
    } catch (error) {
      console.error("Error fetching the chatbot response", error);
    }

    setInput(""); // Xóa input sau khi gửi tin nhắn
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <div className="chatbot-title">POIL luôn chào mừng bạn </div>
        <button
          className="chatbot-close"
          onClick={() => console.log("Close chatbot")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="24px"
            height="24px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 2c-1.36 0-2.72.54-3.76 1.58L8.21 10.68l-3.88-3.88c-.2-.2-.52-.2-.71 0s-.2.52 0 .71l4.59 4.59-3.58 3.58c-.2.2-.2.52 0 .71s.52.2.71 0l3.58-3.58 4.59 4.59c.2.2.52.2.71 0s.2-.52 0-.71l-3.88-3.88 6.1-6.1c1.04-1.04 1.58-2.4 1.58-3.76s-.54-2.72-1.58-3.76A5.25 5.25 0 0019.5 2zm0 1c.92 0 1.75.36 2.38.98S23 4.58 23 5.5s-.36 1.75-.98 2.38l-1.43 1.43-2.5-2.5 1.43-1.43c.63-.63.98-1.46.98-2.38s-.36-1.75-.98-2.38A3.34 3.34 0 0019.5 3zm-2.8 4.88l2.5 2.5-6.1 6.1-4.59-4.59 3.88-3.88-6.1-6.1c-.83-.83-.83-2.17 0-3s2.17-.83 3 0l6.1 6.1 3.88-3.88 4.59 4.59-3.88 3.88z" />
          </svg>
        </button>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : null)}
          placeholder="nhập tin nhắn tại đây..."
        />
        <button className="gui" onClick={sendMessage}>
          Gửi
        </button>
      </div>
    </div>
  );
}
