import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import LearningSystem from './services/LearningSystem.js';
import GeneralKnowledge from './services/GeneralKnowledge.js';
import PatternAnalyzer from './services/PatternAnalyzer.js';
import RecommendationEngine from './services/RecommendationEngine.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize services
const learningSystem = new LearningSystem();
const generalKnowledge = new GeneralKnowledge();
const patternAnalyzer = new PatternAnalyzer();
const recommendationEngine = new RecommendationEngine();

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend running', timestamp: new Date() });
});

// ===== LEARNING & TRACKING ENDPOINTS =====

/**
 * Log a conversation for learning
 * POST /api/learn/log-conversation
 */
app.post('/api/learn/log-conversation', async (req, res) => {
  try {
    const { userMessage, botResponse, userId, courseId, matched, confidence } = req.body;
    
    if (!userMessage || !botResponse) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await learningSystem.logConversation({
      userMessage,
      botResponse,
      userId: userId || 'anonymous',
      courseId,
      matched,
      confidence,
      timestamp: new Date()
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error logging conversation:', error);
    res.status(500).json({ error: 'Failed to log conversation' });
  }
});

/**
 * Get popular questions for learning
 * GET /api/learn/popular-questions?limit=10
 */
app.get('/api/learn/popular-questions', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const popular = await learningSystem.getPopularQuestions(limit);
    res.json({ success: true, data: popular });
  } catch (error) {
    console.error('Error fetching popular questions:', error);
    res.status(500).json({ error: 'Failed to fetch popular questions' });
  }
});

/**
 * Get conversation patterns for analysis
 * GET /api/learn/patterns?timeframe=7d
 */
app.get('/api/learn/patterns', async (req, res) => {
  try {
    const timeframe = req.query.timeframe || '7d';
    const patterns = await patternAnalyzer.analyzePatterns(timeframe);
    res.json({ success: true, data: patterns });
  } catch (error) {
    console.error('Error analyzing patterns:', error);
    res.status(500).json({ error: 'Failed to analyze patterns' });
  }
});

/**
 * Report feedback on bot response
 * POST /api/learn/feedback
 */
app.post('/api/learn/feedback', async (req, res) => {
  try {
    const { conversationId, feedback, rating, userId } = req.body;
    
    if (!feedback || !conversationId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await learningSystem.logFeedback({
      conversationId,
      feedback,
      rating: rating || 0,
      userId: userId || 'anonymous',
      timestamp: new Date()
    });

    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error logging feedback:', error);
    res.status(500).json({ error: 'Failed to log feedback' });
  }
});

// ===== GENERAL KNOWLEDGE ENDPOINTS =====

/**
 * Get general knowledge about a topic
 * GET /api/knowledge/python?topic=basics
 * GET /api/knowledge/ai?topic=what-is-ai
 * GET /api/knowledge/critical-thinking?topic=problem-solving
 */
app.get('/api/knowledge/:subject', async (req, res) => {
  try {
    const { subject } = req.params;
    const { topic } = req.query;
    
    const knowledge = await generalKnowledge.getKnowledge(subject, topic);
    
    if (!knowledge) {
      return res.status(404).json({ error: `No knowledge found for ${subject}/${topic}` });
    }

    res.json({ success: true, data: knowledge });
  } catch (error) {
    console.error('Error fetching knowledge:', error);
    res.status(500).json({ error: 'Failed to fetch knowledge' });
  }
});

/**
 * Search knowledge base
 * GET /api/knowledge/search?query=python+functions
 */
app.get('/api/knowledge/search', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.length < 2) {
      return res.status(400).json({ error: 'Query must be at least 2 characters' });
    }

    const results = await generalKnowledge.search(query);
    res.json({ success: true, data: results });
  } catch (error) {
    console.error('Error searching knowledge:', error);
    res.status(500).json({ error: 'Failed to search knowledge' });
  }
});

/**
 * Get learning paths and recommendations
 * GET /api/knowledge/learning-path?level=beginner&interest=python
 */
app.get('/api/knowledge/learning-path', async (req, res) => {
  try {
    const { level = 'beginner', interest } = req.query;
    const path = await generalKnowledge.getLearningPath(level, interest);
    res.json({ success: true, data: path });
  } catch (error) {
    console.error('Error getting learning path:', error);
    res.status(500).json({ error: 'Failed to get learning path' });
  }
});

// ===== RECOMMENDATION ENGINE ENDPOINTS =====

/**
 * Create or update user profile
 * POST /api/recommendations/user/profile
 */
app.post('/api/recommendations/user/profile', async (req, res) => {
  try {
    const { userId, name, email, learningLevel, interests, learningStyle } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }

    const profile = await recommendationEngine.createUserProfile(userId, {
      name,
      email,
      learningLevel,
      interests: interests || [],
      learningStyle
    });

    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error creating user profile:', error);
    res.status(500).json({ error: 'Failed to create user profile' });
  }
});

/**
 * Get user profile
 * GET /api/recommendations/user/:userId/profile
 */
app.get('/api/recommendations/user/:userId/profile', async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await recommendationEngine.getUserProfile(userId);

    if (!profile) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

/**
 * Get personalized recommendations for user
 * GET /api/recommendations/user/:userId/recommendations?limit=5
 */
app.get('/api/recommendations/user/:userId/recommendations', async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 5;

    const recommendations = await recommendationEngine.getPersonalizedRecommendations(userId, limit);

    res.json({ success: true, data: recommendations });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

/**
 * Update user progress on a topic
 * POST /api/recommendations/user/:userId/progress
 */
app.post('/api/recommendations/user/:userId/progress', async (req, res) => {
  try {
    const { userId } = req.params;
    const { courseId, topicTitle, status, timeSpent, quizScore, notes } = req.body;

    if (!courseId || !topicTitle) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const progress = await recommendationEngine.updateUserProgress(userId, courseId, topicTitle, {
      status,
      timeSpent,
      quizScore,
      notes
    });

    res.json({ success: true, data: progress });
  } catch (error) {
    console.error('Error updating user progress:', error);
    res.status(500).json({ error: 'Failed to update user progress' });
  }
});

/**
 * Get user learning analytics
 * GET /api/recommendations/user/:userId/analytics
 */
app.get('/api/recommendations/user/:userId/analytics', async (req, res) => {
  try {
    const { userId } = req.params;
    const analytics = await recommendationEngine.getUserAnalytics(userId);

    res.json({ success: true, data: analytics });
  } catch (error) {
    console.error('Error getting user analytics:', error);
    res.status(500).json({ error: 'Failed to get user analytics' });
  }
});

/**
 * Get recommended learning path for user
 * GET /api/recommendations/user/:userId/learning-path
 */
app.get('/api/recommendations/user/:userId/learning-path', async (req, res) => {
  try {
    const { userId } = req.params;
    const path = await recommendationEngine.getRecommendedLearningPath(userId);

    res.json({ success: true, data: path });
  } catch (error) {
    console.error('Error getting learning path:', error);
    res.status(500).json({ error: 'Failed to get learning path' });
  }
});

/**
 * Update user interests
 * PUT /api/recommendations/user/:userId/interests
 */
app.put('/api/recommendations/user/:userId/interests', async (req, res) => {
  try {
    const { userId } = req.params;
    const { interests } = req.body;

    if (!interests || !Array.isArray(interests)) {
      return res.status(400).json({ error: 'Invalid interests format' });
    }

    const updated = await recommendationEngine.updateUserInterests(userId, interests);

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating interests:', error);
    res.status(500).json({ error: 'Failed to update interests' });
  }
});

/**
 * Update user learning level
 * PUT /api/recommendations/user/:userId/level
 */
app.put('/api/recommendations/user/:userId/level', async (req, res) => {
  try {
    const { userId } = req.params;
    const { level } = req.body;

    if (!level) {
      return res.status(400).json({ error: 'Missing level' });
    }

    const updated = await recommendationEngine.updateUserLearningLevel(userId, level);

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating learning level:', error);
    res.status(500).json({ error: 'Failed to update learning level' });
  }
});

// ===== ADMIN ENDPOINTS =====

/**
 * Get learning statistics
 * GET /api/admin/stats
 */
app.get('/api/admin/stats', async (req, res) => {
  try {
    const stats = await learningSystem.getStatistics();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

/**
 * Get unmatched questions (for improving knowledge base)
 * GET /api/admin/unmatched-questions?limit=20
 */
app.get('/api/admin/unmatched-questions', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const unmatched = await learningSystem.getUnmatchedQuestions(limit);
    res.json({ success: true, data: unmatched });
  } catch (error) {
    console.error('Error fetching unmatched questions:', error);
    res.status(500).json({ error: 'Failed to fetch unmatched questions' });
  }
});

/**
 * Improve matching algorithm based on patterns
 * POST /api/admin/improve-algorithm
 */
app.post('/api/admin/improve-algorithm', async (req, res) => {
  try {
    const improvements = await patternAnalyzer.generateAlgorithmImprovements();
    res.json({ success: true, data: improvements });
  } catch (error) {
    console.error('Error improving algorithm:', error);
    res.status(500).json({ error: 'Failed to improve algorithm' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GiiT Chatbot Backend running on http://localhost:${PORT}`);
  console.log(`📚 Learning system initialized`);
  console.log(`🧠 General knowledge base loaded`);
});
