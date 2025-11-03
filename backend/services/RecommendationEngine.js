import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const RECOMMENDATIONS_FILE = path.join(DATA_DIR, 'recommendations.json');
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json');

/**
 * Recommendation Engine - Personalized learning recommendations based on user behavior
 */
class RecommendationEngine {
  constructor() {
    this.initializeDataFiles();
  }

  /**
   * Initialize data files for user tracking
   */
  initializeDataFiles() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [] }, null, 2));
    }

    if (!fs.existsSync(RECOMMENDATIONS_FILE)) {
      fs.writeFileSync(RECOMMENDATIONS_FILE, JSON.stringify({ recommendations: [] }, null, 2));
    }

    if (!fs.existsSync(PROGRESS_FILE)) {
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ progress: [] }, null, 2));
    }
  }

  /**
   * Create or update user profile
   */
  async createUserProfile(userId, userInfo) {
    try {
      const users = this.loadUsers();
      
      const existingUser = users.users.find(u => u.id === userId);
      
      if (existingUser) {
        // Update existing user
        Object.assign(existingUser, {
          ...userInfo,
          updatedAt: new Date()
        });
      } else {
        // Create new user
        const newUser = {
          id: userId,
          name: userInfo.name || 'Anonymous',
          email: userInfo.email || null,
          learningLevel: userInfo.learningLevel || 'beginner',
          interests: userInfo.interests || [],
          enrolledCourses: [],
          completedTopics: [],
          learningStyle: userInfo.learningStyle || 'mixed',
          createdAt: new Date(),
          updatedAt: new Date(),
          totalLearningHours: 0,
          lastActivityDate: new Date(),
          feedbackHistory: []
        };
        users.users.push(newUser);
      }

      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
      return existingUser || users.users[users.users.length - 1];
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }

  /**
   * Update user learning progress
   */
  async updateUserProgress(userId, courseId, topicTitle, progressData) {
    try {
      const progress = this.loadProgress();
      const user = this.getUserProfile(userId);

      if (!user) {
        throw new Error('User not found');
      }

      const progressEntry = {
        id: `progress-${Date.now()}`,
        userId,
        courseId,
        topicTitle,
        status: progressData.status || 'in_progress', // in_progress, completed, abandoned
        startedAt: progressData.startedAt || new Date(),
        completedAt: progressData.completedAt || null,
        timeSpent: progressData.timeSpent || 0, // in minutes
        quizScore: progressData.quizScore || null,
        notes: progressData.notes || null,
        updatedAt: new Date()
      };

      // Check if this progress entry already exists
      const existingIndex = progress.progress.findIndex(
        p => p.userId === userId && p.courseId === courseId && p.topicTitle === topicTitle
      );

      if (existingIndex >= 0) {
        progress.progress[existingIndex] = progressEntry;
      } else {
        progress.progress.push(progressEntry);
      }

      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));

      // Update user profile
      if (progressData.status === 'completed' && !user.completedTopics.includes(topicTitle)) {
        user.completedTopics.push(topicTitle);
        user.totalLearningHours += (progressData.timeSpent || 0) / 60;
        user.lastActivityDate = new Date();
        this.updateUserFile(user);
      }

      return progressEntry;
    } catch (error) {
      console.error('Error updating user progress:', error);
      throw error;
    }
  }

  /**
   * Get personalized recommendations for a user
   */
  async getPersonalizedRecommendations(userId, limit = 5) {
    try {
      const user = this.getUserProfile(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const recommendations = [];

      // Strategy 1: Recommend based on interests
      if (user.interests.length > 0) {
        const interestBasedRecs = this.getRecommendationsByInterest(user.interests, user.learningLevel, user.completedTopics);
        recommendations.push(...interestBasedRecs);
      }

      // Strategy 2: Recommend related topics based on completed topics
      if (user.completedTopics.length > 0) {
        const relatedRecs = this.getRelatedTopicRecommendations(user.completedTopics, user.learningLevel);
        recommendations.push(...relatedRecs);
      }

      // Strategy 3: Recommend based on learning level progression
      const levelRecs = this.getLevelProgressionRecommendations(user.learningLevel, user.completedTopics);
      recommendations.push(...levelRecs);

      // Remove duplicates and sort by score
      const uniqueRecs = this.deduplicateAndSortRecommendations(recommendations);

      // Save recommendations
      this.saveRecommendations(userId, uniqueRecs);

      return uniqueRecs.slice(0, limit);
    } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      throw error;
    }
  }

  /**
   * Get recommendations based on user interests
   */
  getRecommendationsByInterest(interests, learningLevel, completedTopics) {
    const recommendations = [];
    const knowledgeData = this.loadKnowledgeData();

    interests.forEach(interest => {
      const subject = knowledgeData[interest.toLowerCase()];
      
      if (subject && subject.content) {
        subject.content.forEach(topic => {
          if (!completedTopics.includes(topic.title)) {
            const score = this.calculateTopicRelevanceScore(topic, learningLevel, interest);
            recommendations.push({
              subject: interest,
              topic: topic.title,
              description: topic.description,
              level: topic.level || 'beginner',
              duration: topic.duration || '2 weeks',
              score,
              reason: `Related to your interest in ${interest}`,
              type: 'interest_based'
            });
          }
        });
      }
    });

    return recommendations;
  }

  /**
   * Get recommendations for related topics
   */
  getRelatedTopicRecommendations(completedTopics, learningLevel) {
    const recommendations = [];
    const knowledgeData = this.loadKnowledgeData();
    const relatedTopicsSet = new Set();

    // Find all related topics from completed topics
    completedTopics.forEach(completedTopic => {
      Object.values(knowledgeData).forEach(subject => {
        const topic = subject.content?.find(t => t.title === completedTopic);
        if (topic && topic.relatedTopics) {
          topic.relatedTopics.forEach(related => {
            relatedTopicsSet.add(related);
          });
        }
      });
    });

    // Generate recommendations for related topics
    Object.entries(knowledgeData).forEach(([subject, data]) => {
      data.content?.forEach(topic => {
        if (relatedTopicsSet.has(topic.title) && !completedTopics.includes(topic.title)) {
          const score = this.calculateTopicRelevanceScore(topic, learningLevel, subject, true);
          recommendations.push({
            subject,
            topic: topic.title,
            description: topic.description,
            level: topic.level || 'beginner',
            duration: topic.duration || '2 weeks',
            score,
            reason: 'Related to topics you\'ve completed',
            type: 'related'
          });
        }
      });
    });

    return recommendations;
  }

  /**
   * Get recommendations based on learning level progression
   */
  getLevelProgressionRecommendations(currentLevel, completedTopics) {
    const recommendations = [];
    const knowledgeData = this.loadKnowledgeData();
    const levelHierarchy = ['beginner', 'intermediate', 'advanced', 'expert'];
    const currentLevelIndex = levelHierarchy.indexOf(currentLevel);

    Object.entries(knowledgeData).forEach(([subject, data]) => {
      data.content?.forEach(topic => {
        if (!completedTopics.includes(topic.title)) {
          const topicLevelIndex = levelHierarchy.indexOf(topic.level || 'beginner');

          // Recommend topics that are one level above current (or same for varied subjects)
          if (topicLevelIndex === currentLevelIndex || topicLevelIndex === currentLevelIndex + 1) {
            const score = this.calculateTopicRelevanceScore(topic, currentLevel, subject);
            recommendations.push({
              subject,
              topic: topic.title,
              description: topic.description,
              level: topic.level || 'beginner',
              duration: topic.duration || '2 weeks',
              score: score * 0.9,
              reason: `Recommended for ${currentLevel} level learners`,
              type: 'level_progression'
            });
          }
        }
      });
    });

    return recommendations;
  }

  /**
   * Calculate relevance score for a topic
   */
  calculateTopicRelevanceScore(topic, userLevel, subject, isRelated = false) {
    let score = 50;

    // Level matching bonus
    const levelMatch = topic.level?.toLowerCase() === userLevel?.toLowerCase();
    if (levelMatch) score += 30;
    else if (topic.level?.toLowerCase() === 'beginner') score += 20;

    // Related topic bonus
    if (isRelated) score += 25;

    // Subject alignment bonus (if available)
    if (topic.duration) {
      const durationMatch = topic.duration.includes('week') || topic.duration.includes('day');
      if (durationMatch) score += 10;
    }

    return score;
  }

  /**
   * Deduplicate and sort recommendations
   */
  deduplicateAndSortRecommendations(recommendations) {
    const map = new Map();

    recommendations.forEach(rec => {
      const key = `${rec.subject}-${rec.topic}`;
      const existing = map.get(key);

      if (existing) {
        // Keep the recommendation with higher score
        if (rec.score > existing.score) {
          map.set(key, rec);
        }
      } else {
        map.set(key, rec);
      }
    });

    return Array.from(map.values()).sort((a, b) => b.score - a.score);
  }

  /**
   * Get user learning analytics
   */
  async getUserAnalytics(userId) {
    try {
      const user = this.getUserProfile(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const progress = this.loadProgress();
      const userProgress = progress.progress.filter(p => p.userId === userId);

      const completedCount = userProgress.filter(p => p.status === 'completed').length;
      const inProgressCount = userProgress.filter(p => p.status === 'in_progress').length;
      const totalTimeSpent = userProgress.reduce((sum, p) => sum + (p.timeSpent || 0), 0);

      const averageQuizScore = userProgress.length > 0
        ? (userProgress
          .filter(p => p.quizScore !== null && p.quizScore !== undefined)
          .reduce((sum, p) => sum + p.quizScore, 0) / userProgress.filter(p => p.quizScore).length) || 0
        : 0;

      return {
        userId,
        userName: user.name,
        learningLevel: user.learningLevel,
        interests: user.interests,
        topicsCompleted: completedCount,
        topicsInProgress: inProgressCount,
        totalTopicsTracked: userProgress.length,
        totalLearningHours: Math.round(totalTimeSpent / 60),
        averageQuizScore: Math.round(averageQuizScore),
        learningStreak: this.calculateLearningStreak(userProgress),
        completedTopics: user.completedTopics,
        joinDate: user.createdAt,
        lastActivityDate: user.lastActivityDate
      };
    } catch (error) {
      console.error('Error getting user analytics:', error);
      throw error;
    }
  }

  /**
   * Calculate learning streak
   */
  calculateLearningStreak(userProgress) {
    if (userProgress.length === 0) return 0;

    const sortedByDate = userProgress.sort((a, b) => 
      new Date(b.updatedAt) - new Date(a.updatedAt)
    );

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const progress of sortedByDate) {
      const progressDate = new Date(progress.updatedAt);
      progressDate.setHours(0, 0, 0, 0);

      const dayDifference = Math.floor((currentDate - progressDate) / (1000 * 60 * 60 * 24));

      if (dayDifference === streak) {
        streak++;
        currentDate = new Date(progressDate);
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  /**
   * Get recommended learning path for user
   */
  async getRecommendedLearningPath(userId) {
    try {
      const user = this.getUserProfile(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const recommendations = await this.getPersonalizedRecommendations(userId, 10);
      
      const path = {
        userId,
        userName: user.name,
        currentLevel: user.learningLevel,
        recommendedPath: recommendations.map((rec, index) => ({
          order: index + 1,
          subject: rec.subject,
          topic: rec.topic,
          description: rec.description,
          level: rec.level,
          duration: rec.duration,
          estimatedTimePerWeek: '5-10 hours',
          difficulty: this.getDifficultyLabel(rec.level)
        })),
        estimatedTotalDuration: this.calculatePathDuration(recommendations),
        nextSteps: recommendations.slice(0, 3),
        notes: this.generatePathNotes(user, recommendations)
      };

      return path;
    } catch (error) {
      console.error('Error getting learning path:', error);
      throw error;
    }
  }

  /**
   * Calculate total duration for a learning path
   */
  calculatePathDuration(recommendations) {
    const durationMap = {
      '1 week': 1,
      '2 weeks': 2,
      '3 weeks': 3,
      '4 weeks': 4,
      '1 month': 4,
      '2 months': 8
    };

    let totalWeeks = 0;
    recommendations.forEach(rec => {
      totalWeeks += durationMap[rec.duration] || 2;
    });

    return totalWeeks >= 4 ? `${Math.ceil(totalWeeks / 4)} months` : `${totalWeeks} weeks`;
  }

  /**
   * Get difficulty label for a level
   */
  getDifficultyLabel(level) {
    const labels = {
      'beginner': 'Easy',
      'foundational': 'Easy',
      'intermediate': 'Medium',
      'advanced': 'Hard',
      'expert': 'Expert'
    };
    return labels[level?.toLowerCase()] || 'Medium';
  }

  /**
   * Generate personalized notes for learning path
   */
  generatePathNotes(user, recommendations) {
    const notes = [];

    if (user.learningLevel === 'beginner') {
      notes.push('As a beginner, start with foundational topics and practice regularly.');
    }

    if (recommendations.some(r => r.type === 'related')) {
      notes.push('Many topics in this path are related to what you\'ve already learned.');
    }

    if (user.interests.length > 0) {
      notes.push(`This path aligns with your interests in: ${user.interests.join(', ')}.`);
    }

    notes.push('Complete topics at your own pace and take quizzes to reinforce learning.');

    return notes;
  }

  /**
   * Update user interests
   */
  async updateUserInterests(userId, interests) {
    try {
      const user = this.getUserProfile(userId);
      if (!user) {
        throw new Error('User not found');
      }

      user.interests = interests;
      user.updatedAt = new Date();
      this.updateUserFile(user);

      return user;
    } catch (error) {
      console.error('Error updating user interests:', error);
      throw error;
    }
  }

  /**
   * Update user learning level
   */
  async updateUserLearningLevel(userId, level) {
    try {
      const user = this.getUserProfile(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const validLevels = ['beginner', 'intermediate', 'advanced', 'expert'];
      if (!validLevels.includes(level)) {
        throw new Error('Invalid learning level');
      }

      user.learningLevel = level;
      user.updatedAt = new Date();
      this.updateUserFile(user);

      return user;
    } catch (error) {
      console.error('Error updating user learning level:', error);
      throw error;
    }
  }

  /**
   * Helper: Get user profile
   */
  getUserProfile(userId) {
    const users = this.loadUsers();
    return users.users.find(u => u.id === userId);
  }

  /**
   * Helper: Update user file
   */
  updateUserFile(user) {
    const users = this.loadUsers();
    const index = users.users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users.users[index] = user;
      fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    }
  }

  /**
   * Helper: Save recommendations
   */
  saveRecommendations(userId, recommendations) {
    try {
      const recs = this.loadRecommendations();
      
      recs.recommendations = recs.recommendations.filter(r => r.userId !== userId);
      recs.recommendations.push({
        userId,
        recommendations,
        generatedAt: new Date()
      });

      fs.writeFileSync(RECOMMENDATIONS_FILE, JSON.stringify(recs, null, 2));
    } catch (error) {
      console.error('Error saving recommendations:', error);
    }
  }

  /**
   * Helper: Load users from file
   */
  loadUsers() {
    try {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading users:', error);
      return { users: [] };
    }
  }

  /**
   * Helper: Load recommendations from file
   */
  loadRecommendations() {
    try {
      const data = fs.readFileSync(RECOMMENDATIONS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      return { recommendations: [] };
    }
  }

  /**
   * Helper: Load progress from file
   */
  loadProgress() {
    try {
      const data = fs.readFileSync(PROGRESS_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading progress:', error);
      return { progress: [] };
    }
  }

  /**
   * Helper: Load knowledge data
   */
  loadKnowledgeData() {
    try {
      const knowledgeModule = require('../data/knowledge.js');
      return knowledgeModule.default || knowledgeModule;
    } catch (error) {
      console.error('Error loading knowledge data:', error);
      return {};
    }
  }
}

export default RecommendationEngine;
