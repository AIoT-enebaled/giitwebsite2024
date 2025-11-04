import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const CONVERSATIONS_FILE = path.join(DATA_DIR, 'conversations.json');
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.json');

/**
 * Learning System - Tracks conversations and learns from patterns
 */
class LearningSystem {
  constructor() {
    this.initializeDataFiles();
  }

  /**
   * Initialize data files if they don't exist
   */
  initializeDataFiles() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(CONVERSATIONS_FILE)) {
      fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify({ conversations: [] }, null, 2));
    }

    if (!fs.existsSync(FEEDBACK_FILE)) {
      fs.writeFileSync(FEEDBACK_FILE, JSON.stringify({ feedback: [] }, null, 2));
    }
  }

  /**
   * Log a conversation for learning
   */
  async logConversation(data) {
    try {
      const conversations = this.loadConversations();
      
      const entry = {
        id: `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userMessage: data.userMessage,
        botResponse: data.botResponse,
        userId: data.userId,
        courseId: data.courseId || null,
        matched: data.matched || false,
        confidence: data.confidence || 0,
        timestamp: data.timestamp || new Date(),
        feedback: null
      };

      conversations.conversations.push(entry);
      fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(conversations, null, 2));

      return entry;
    } catch (error) {
      console.error('Error logging conversation:', error);
      throw error;
    }
  }

  /**
   * Get popular questions for analysis
   */
  async getPopularQuestions(limit = 10) {
    try {
      const conversations = this.loadConversations();
      
      // Count question frequency
      const questionCounts = {};
      conversations.conversations.forEach(conv => {
        const normalized = conv.userMessage.toLowerCase().trim();
        questionCounts[normalized] = (questionCounts[normalized] || 0) + 1;
      });

      // Sort by frequency and return top N
      const popular = Object.entries(questionCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([question, count]) => ({
          question,
          frequency: count,
          percentage: ((count / conversations.conversations.length) * 100).toFixed(2) + '%'
        }));

      return popular;
    } catch (error) {
      console.error('Error getting popular questions:', error);
      throw error;
    }
  }

  /**
   * Get unmatched questions (not answered by bot)
   */
  async getUnmatchedQuestions(limit = 20) {
    try {
      const conversations = this.loadConversations();
      
      const unmatched = conversations.conversations
        .filter(conv => !conv.matched || conv.confidence < 0.5)
        .slice(-limit)
        .map(conv => ({
          question: conv.userMessage,
          botResponse: conv.botResponse,
          confidence: conv.confidence,
          timestamp: conv.timestamp,
          feedback: conv.feedback
        }));

      return unmatched;
    } catch (error) {
      console.error('Error getting unmatched questions:', error);
      throw error;
    }
  }

  /**
   * Log user feedback on a bot response
   */
  async logFeedback(data) {
    try {
      const feedback = this.loadFeedback();
      
      const entry = {
        id: `feedback-${Date.now()}`,
        conversationId: data.conversationId,
        feedback: data.feedback,
        rating: data.rating,
        userId: data.userId,
        timestamp: data.timestamp || new Date()
      };

      feedback.feedback.push(entry);
      fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedback, null, 2));

      // Update corresponding conversation with feedback
      this.updateConversationFeedback(data.conversationId, data.feedback);

      return entry;
    } catch (error) {
      console.error('Error logging feedback:', error);
      throw error;
    }
  }

  /**
   * Get learning statistics
   */
  async getStatistics() {
    try {
      const conversations = this.loadConversations();
      const feedback = this.loadFeedback();
      
      const totalConversations = conversations.conversations.length;
      const matchedCount = conversations.conversations.filter(c => c.matched).length;
      const averageConfidence = conversations.conversations.length > 0
        ? (conversations.conversations.reduce((sum, c) => sum + (c.confidence || 0), 0) / totalConversations).toFixed(2)
        : 0;

      const positiveFeedback = feedback.feedback.filter(f => f.rating > 0).length;
      const negativeFeedback = feedback.feedback.filter(f => f.rating < 0).length;

      return {
        totalConversations,
        matchedQuestions: matchedCount,
        unmatchedQuestions: totalConversations - matchedCount,
        matchRate: ((matchedCount / totalConversations) * 100).toFixed(2) + '%',
        averageConfidence,
        totalFeedback: feedback.feedback.length,
        positiveFeedback,
        negativeFeedback,
        feedbackRate: ((feedback.feedback.length / totalConversations) * 100).toFixed(2) + '%'
      };
    } catch (error) {
      console.error('Error getting statistics:', error);
      throw error;
    }
  }

  /**
   * Update conversation with feedback
   */
  updateConversationFeedback(conversationId, feedback) {
    try {
      const conversations = this.loadConversations();
      const conv = conversations.conversations.find(c => c.id === conversationId);
      
      if (conv) {
        conv.feedback = feedback;
        fs.writeFileSync(CONVERSATIONS_FILE, JSON.stringify(conversations, null, 2));
      }
    } catch (error) {
      console.error('Error updating conversation feedback:', error);
    }
  }

  /**
   * Load conversations from file
   */
  loadConversations() {
    try {
      const data = fs.readFileSync(CONVERSATIONS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
      return { conversations: [] };
    }
  }

  /**
   * Load feedback from file
   */
  loadFeedback() {
    try {
      const data = fs.readFileSync(FEEDBACK_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading feedback:', error);
      return { feedback: [] };
    }
  }
}

export default LearningSystem;
