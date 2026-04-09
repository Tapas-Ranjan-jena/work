import { useState, useEffect, useRef } from "react";
import "./AIChatPage.css";
import aiCheckLogo from "../../assets/ai-check-logo.svg";

interface Message {
  id: string;
  text: string;
  sender: "me" | "ai";
  timestamp: Date;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatActive, setIsChatActive] = useState(false);
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
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    if (!isChatActive) setIsChatActive(true);

    const newMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: "me",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsLoading(true);

    // Mock AI Response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getMockResponse(text),
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
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

  return (
    <div className="ai-page-container">
      {/* HEADER SECTION */}
      <div className={`ai-page-header ${isChatActive ? 'chat-active' : ''}`}>
        <div className="ai-center-logo">
          <img src={aiCheckLogo} alt="AI" />
        </div>
        <h1 className="ai-page-title">Ask our AI anything</h1>
      </div>

      {/* MESSAGES TIMELINE */}
      <div className="ai-page-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`ai-msg-group ${msg.sender}`}>
            <span className="ai-msg-label">
              {msg.sender === "me" ? "Me" : "OUR AI"}
            </span>
            <div className="ai-msg-bubble">
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="ai-msg-group ai">
            <span className="ai-msg-label">OUR AI</span>
            <div className="ai-msg-bubble">
              <div className="ai-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* FOOTER BAR */}
      <div className="ai-page-input-area">
        {!isChatActive && (
          <div className="ai-suggestions-container">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="ai-page-suggestion"
                onClick={() => handleSendMessage(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        
        <div className="ai-page-input-container">
          <input 
            type="text" 
            className="ai-page-input" 
            placeholder="Ask me anything about your projects"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
          />
          <button 
            className="ai-page-send-btn"
            onClick={() => handleSendMessage(inputValue)}
          >
            <i className="bi bi-send-fill" style={{ fontSize: '20px' }}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
