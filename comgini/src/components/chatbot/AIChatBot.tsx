import { useState, useEffect, useRef } from "react";
import "../../styles/chatbot.css";
import aiCheckLogo from "../../assets/ai-check-logo.svg";
import chatAiLogo from "../../assets/chat-ai-logo.svg";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What can I ask you to do?",
    "Which one of my projects is performing the best?",
    "What Projects should I be concerned about right now?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isLoading, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    if (!isChatActive) setIsChatActive(true);

    const newMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsLoading(true);

    // Mock AI Response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getMockResponse(text),
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getMockResponse = (query: string) => {
    const q = query.toLowerCase();
    if (q.includes("what can you do")) {
      return "I can help you analyze project performance, track tasks, manage financial data, and provide insights into your dashboard metrics. Ask me anything about your current projects!";
    }
    if (q.includes("performing the best")) {
      return "Based on recent data, the 'Mobile App Development' project is performing best with 95% task completion rate and being 2 days ahead of schedule.";
    }
    if (q.includes("concerned about")) {
      return "You should look into 'Legacy System Migration'. It has 3 high-priority tasks pending for over a week and budget utilization reached 85%.";
    }
    return "That's an interesting question! I am currently processing your data to provide the most accurate insight. Is there anything specific you'd like to dive deeper into?";
  };

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
    // Optional: Reset chat state if closing? Usually better to keep it.
  };

  return (
    <>
      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <button className="ai-floating-trigger" onClick={toggleOverlay}>
          <div className="ai-trigger-icon">
            <img src={chatAiLogo} alt="AI" />
          </div>
          <span className="ai-trigger-text">Chat with AI</span>
        </button>
      )}

      {/* FULL-PAGE OVERLAY */}
      {isOpen && (
        <div className="ai-overlay-wrapper">
          <button className="ai-overlay-close" onClick={toggleOverlay}>
            <i className="bi bi-x-lg"></i>
          </button>

          {/* HEADER AREA */}
          <div className={`ai-overlay-header ${isChatActive ? 'chat-active' : ''}`}>
            <div className="ai-overlay-logo">
              <img src={aiCheckLogo} alt="AI" />
            </div>
            <h1 className="ai-overlay-title">Ask our AI anything</h1>
          </div>

          {/* MESSAGES AREA */}
          <div className="ai-overlay-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-msg-item ${msg.sender}`}>
                <span className="ai-msg-label">
                  {msg.sender === "user" ? "Me" : "OUR AI"}
                </span>
                <div className="ai-msg-bubble-wrap">
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="ai-msg-item bot">
                <span className="ai-msg-label">OUR AI</span>
                <div className="ai-msg-bubble-wrap">
                  <div className="ai-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT AREA */}
          <div className="ai-overlay-input-wrap">
            {!isChatActive && (
              <div className="ai-suggestions-list">
                {suggestions.map((s, i) => (
                  <div key={i} className="ai-suggestion-pill" onClick={() => handleSendMessage(s)}>
                    {s}
                  </div>
                ))}
              </div>
            )}
            
            <div className="ai-input-box">
              <input 
                type="text" 
                placeholder="Ask me anything about your projects"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
              />
              <button className="ai-input-send-btn" onClick={() => handleSendMessage(inputValue)}>
                <i className="bi bi-send-fill" style={{ fontSize: '20px' }}></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
