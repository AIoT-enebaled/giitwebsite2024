import React, { useState, useEffect, useRef } from 'react';
import ChatbotService from '../chatbot/ChatbotService';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  id?: string;
  confidence?: number;
  matched?: boolean;
}

interface UserProfile {
  userId: string;
  name: string;
  learningLevel: string;
  interests: string[];
  topicsCompleted: number;
  totalLearningHours: number;
}

interface Recommendation {
  subject: string;
  topic: string;
  description: string;
  level: string;
  duration: string;
  reason: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackVisible, setFeedbackVisible] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [userAnalytics, setUserAnalytics] = useState<any>(null);
  const chatbotService = ChatbotService.getInstance();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([{
      content: "Hi! I'm the GiiT Assistant. I can help you learn about our courses, programs, Python, AI, Critical Thinking, and more. What would you like to know?",
      sender: 'bot',
      id: 'welcome'
    }]);

    // Initialize user profile
    initializeUserProfile();
  }, []);

  const initializeUserProfile = async () => {
    try {
      const userId = localStorage.getItem('userId') || `chat-user-${Date.now()}`;
      localStorage.setItem('userId', userId);

      // Only attempt backend connection if URL is properly configured
      if (!BACKEND_URL || BACKEND_URL === 'http://localhost:5000') {
        console.warn('Backend URL not configured, skipping profile initialization');
        return;
      }

      // Create or fetch user profile with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const profileRes = await fetch(`${BACKEND_URL}/api/recommendations/user/${userId}/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            name: localStorage.getItem('userName') || 'Learning Assistant User',
            learningLevel: 'beginner',
            interests: ['python', 'web-development'],
            learningStyle: 'visual'
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (profileRes.ok) {
          const data = await profileRes.json();
          setUserProfile(data.data);

          // Fetch initial recommendations
          await fetchRecommendations(userId);
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        console.warn('Backend connection failed, chat will work without recommendations:', fetchError);
      }
    } catch (error) {
      console.warn('Could not initialize user profile:', error);
    }
  };

  const fetchRecommendations = async (userId: string) => {
    try {
      if (!BACKEND_URL || BACKEND_URL === 'http://localhost:5000') {
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`${BACKEND_URL}/api/recommendations/user/${userId}/recommendations?limit=5`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.data || []);
      }
    } catch (error) {
      console.warn('Could not fetch recommendations:', error);
    }
  };

  const fetchUserAnalytics = async (userId: string) => {
    try {
      if (!BACKEND_URL || BACKEND_URL === 'http://localhost:5000') {
        console.warn('Backend not configured for analytics');
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`${BACKEND_URL}/api/recommendations/user/${userId}/analytics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        setUserAnalytics(data.data);
        setShowAnalytics(true);
      }
    } catch (error) {
      console.warn('Could not fetch user analytics:', error);
    }
  };

  const updateUserProgress = async (topicTitle: string, status: 'completed' | 'in_progress') => {
    try {
      if (!BACKEND_URL || BACKEND_URL === 'http://localhost:5000') {
        return;
      }

      const userId = localStorage.getItem('userId') || 'anonymous';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(`${BACKEND_URL}/api/recommendations/user/${userId}/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: 'general',
          topicTitle,
          status,
          timeSpent: status === 'completed' ? 60 : 0,
          quizScore: status === 'completed' ? 85 : null
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (res.ok && status === 'completed') {
        // Refresh recommendations after completing a topic
        await fetchRecommendations(userId);
      }
    } catch (error) {
      console.warn('Could not update user progress:', error);
    }
  };

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFeedback = async (messageId: string, feedbackType: 'helpful' | 'unhelpful') => {
    try {
      await fetch(`${BACKEND_URL}/api/learn/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: messageId,
          feedback: feedbackType,
          rating: feedbackType === 'helpful' ? 1 : -1,
          userId: localStorage.getItem('userId') || 'anonymous'
        })
      });
      setFeedbackVisible(null);
    } catch (error) {
      console.warn('Could not submit feedback:', error);
    }
  };

  const logConversationToBackend = async (userMessage: string, botResponse: string, matched: boolean, confidence: number) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/learn/log-conversation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userMessage,
          botResponse,
          matched,
          confidence,
          userId: localStorage.getItem('userId') || 'anonymous'
        })
      });

      if (!response.ok) {
        console.warn('Failed to log conversation to backend');
      }
    } catch (error) {
      console.warn('Could not connect to backend for logging:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message
    const userMessageId = `user-${Date.now()}`;
    setMessages(prev => [...prev, {
      content: userMessage,
      sender: 'user',
      id: userMessageId
    }]);

    try {
      const response = await chatbotService.getResponse(userMessage);

      // Get match details if available
      const contextService = ChatbotService.getInstance();
      const matched = contextService.context?.lastResponse !== '';
      const confidence = contextService.context?.lastConfidence || 0;

      const botMessageId = `bot-${Date.now()}`;

      // Add bot response
      setMessages(prev => [...prev, {
        content: response,
        sender: 'bot',
        id: botMessageId,
        matched,
        confidence
      }]);

      // Log to backend asynchronously
      await logConversationToBackend(userMessage, response, matched, confidence);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        content: "I'm sorry, I'm having trouble right now. Please try again in a moment.",
        sender: 'bot',
        id: `bot-error-${Date.now()}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-[9999]">
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        style={{ zIndex: 9999 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 mx-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"}
          />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-40 right-4 w-96 h-[500px] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden"
          style={{ zIndex: 9999 }}
        >
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <h2 className="text-xl font-semibold">Chat with GiiT Assistant</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setShowRecommendations(!showRecommendations);
                  setShowAnalytics(false);
                }}
                className="text-white hover:text-gray-200"
                title="View Recommendations"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  const userId = localStorage.getItem('userId') || 'anonymous';
                  fetchUserAnalytics(userId);
                  setShowRecommendations(false);
                }}
                className="text-white hover:text-gray-200"
                title="View Analytics"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {showAnalytics && userAnalytics ? (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-3">Your Learning Analytics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Topics Completed:</span>
                      <span className="font-semibold">{userAnalytics.topicsCompleted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Learning Hours:</span>
                      <span className="font-semibold">{userAnalytics.totalLearningHours}h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average Quiz Score:</span>
                      <span className="font-semibold">{userAnalytics.averageQuizScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Learning Streak:</span>
                      <span className="font-semibold">{userAnalytics.learningStreak} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Level:</span>
                      <span className="font-semibold capitalize">{userAnalytics.learningLevel}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowAnalytics(false)}
                  className="w-full text-sm text-gray-600 hover:text-gray-800"
                >
                  ← Back to Chat
                </button>
              </div>
            ) : showRecommendations ? (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Recommended for You</h3>
                {recommendations.length > 0 ? (
                  recommendations.map((rec, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm text-gray-800">{rec.topic}</p>
                          <p className="text-xs text-gray-600">{rec.subject}</p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{rec.level}</span>
                      </div>
                      <p className="text-xs text-gray-700 mb-2">{rec.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-600 mb-2">
                        <span>⏱️ {rec.duration}</span>
                        <span>💡 {rec.reason}</span>
                      </div>
                      <button
                        onClick={() => {
                          setMessages(prev => [...prev, {
                            content: `Great choice! Let me tell you more about ${rec.topic}...`,
                            sender: 'bot',
                            id: `rec-${idx}`
                          }]);
                          setShowRecommendations(false);
                          updateUserProgress(rec.topic, 'in_progress');
                        }}
                        className="w-full text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                      >
                        Learn More
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No recommendations yet. Start learning to get personalized suggestions!</p>
                )}
                <button
                  onClick={() => setShowRecommendations(false)}
                  className="w-full text-sm text-gray-600 hover:text-gray-800"
                >
                  ← Back to Chat
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id || Math.random()}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex flex-col space-y-2">
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.sender === 'bot' && message.id && (
                        <div className="flex space-x-2 text-xs px-1">
                          {feedbackVisible === message.id ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleFeedback(message.id!, 'helpful')}
                                className="text-green-600 hover:text-green-800 font-semibold"
                              >
                                👍 Helpful
                              </button>
                              <button
                                onClick={() => handleFeedback(message.id!, 'unhelpful')}
                                className="text-red-600 hover:text-red-800 font-semibold"
                              >
                                👎 Not helpful
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setFeedbackVisible(message.id || null)}
                              className="text-gray-400 hover:text-gray-600 text-xs"
                            >
                              Feedback
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-blue-600 bg-white text-gray-800"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
