import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const CONVERSATIONS_FILE = path.join(DATA_DIR, 'conversations.json');
const PATTERNS_FILE = path.join(DATA_DIR, 'patterns.json');

/**
 * Pattern Analyzer - Analyzes conversation patterns to improve matching algorithm
 */
class PatternAnalyzer {
  constructor() {
    this.initializePatternFile();
  }

  /**
   * Initialize patterns file
   */
  initializePatternFile() {
    if (!fs.existsSync(PATTERNS_FILE)) {
      fs.writeFileSync(PATTERNS_FILE, JSON.stringify({
        patterns: [],
        improvements: [],
        lastAnalyzed: null
      }, null, 2));
    }
  }

  /**
   * Analyze conversation patterns
   */
  async analyzePatterns(timeframe = '7d') {
    try {
      const conversations = this.loadConversations();
      const filteredConversations = this.filterByTimeframe(conversations.conversations, timeframe);

      const patterns = {
        commonWords: this.analyzeCommonWords(filteredConversations),
        unmatchedPatterns: this.analyzeUnmatchedPatterns(filteredConversations),
        topicClumps: this.analyzeTopicClumps(filteredConversations),
        confidenceDistribution: this.analyzeConfidence(filteredConversations),
        responsePatterns: this.analyzeResponsePatterns(filteredConversations),
        timeframe,
        analyzedCount: filteredConversations.length
      };

      this.savePatterns(patterns);
      return patterns;
    } catch (error) {
      console.error('Error analyzing patterns:', error);
      throw error;
    }
  }

  /**
   * Analyze common words in questions
   */
  analyzeCommonWords(conversations) {
    const wordFreq = {};
    const stopWords = new Set(['the', 'is', 'at', 'which', 'on', 'in', 'a', 'an', 'and', 'or', 'but', 'do', 'you', 'your', 'have', 'what', 'when', 'where', 'how', 'why', 'if']);

    conversations.forEach(conv => {
      const words = conv.userMessage.toLowerCase().split(/\s+/);
      words.forEach(word => {
        const cleaned = word.replace(/[^a-z0-9]/g, '');
        if (!stopWords.has(cleaned) && cleaned.length > 2) {
          wordFreq[cleaned] = (wordFreq[cleaned] || 0) + 1;
        }
      });
    });

    return Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({ word, frequency: count }));
  }

  /**
   * Analyze unmatched patterns
   */
  analyzeUnmatchedPatterns(conversations) {
    const unmatched = conversations.filter(c => !c.matched || c.confidence < 0.5);
    const patterns = {};

    unmatched.forEach(conv => {
      const firstWord = conv.userMessage.split(' ')[0].toLowerCase();
      patterns[firstWord] = (patterns[firstWord] || 0) + 1;
    });

    return Object.entries(patterns)
      .sort((a, b) => b[1] - a[1])
      .map(([pattern, count]) => ({
        pattern,
        unmatchedCount: count,
        unmatchedRate: ((count / unmatched.length) * 100).toFixed(2) + '%'
      }));
  }

  /**
   * Analyze topic clustering
   */
  analyzeTopicClumps(conversations) {
    const topics = {};

    conversations.forEach(conv => {
      if (conv.courseId) {
        topics[conv.courseId] = (topics[conv.courseId] || 0) + 1;
      }
    });

    return Object.entries(topics)
      .sort((a, b) => b[1] - a[1])
      .map(([topic, count]) => ({
        topic,
        messageCount: count,
        percentage: ((count / conversations.length) * 100).toFixed(2) + '%'
      }));
  }

  /**
   * Analyze confidence distribution
   */
  analyzeConfidence(conversations) {
    const buckets = { high: 0, medium: 0, low: 0, none: 0 };
    let totalConfidence = 0;

    conversations.forEach(conv => {
      const conf = conv.confidence || 0;
      totalConfidence += conf;
      
      if (conf >= 0.8) buckets.high++;
      else if (conf >= 0.5) buckets.medium++;
      else if (conf > 0) buckets.low++;
      else buckets.none++;
    });

    const total = conversations.length;
    return {
      high: { count: buckets.high, percentage: ((buckets.high / total) * 100).toFixed(2) + '%' },
      medium: { count: buckets.medium, percentage: ((buckets.medium / total) * 100).toFixed(2) + '%' },
      low: { count: buckets.low, percentage: ((buckets.low / total) * 100).toFixed(2) + '%' },
      none: { count: buckets.none, percentage: ((buckets.none / total) * 100).toFixed(2) + '%' },
      average: (totalConfidence / total).toFixed(2)
    };
  }

  /**
   * Analyze response patterns
   */
  analyzeResponsePatterns(conversations) {
    const patterns = {
      withCourseId: 0,
      withFeedback: 0,
      withoutMatches: 0
    };

    conversations.forEach(conv => {
      if (conv.courseId) patterns.withCourseId++;
      if (conv.feedback) patterns.withFeedback++;
      if (!conv.matched) patterns.withoutMatches++;
    });

    const total = conversations.length;
    return {
      courseIdProvided: { count: patterns.withCourseId, percentage: ((patterns.withCourseId / total) * 100).toFixed(2) + '%' },
      feedbackReceived: { count: patterns.withFeedback, percentage: ((patterns.withFeedback / total) * 100).toFixed(2) + '%' },
      unmatchedResponses: { count: patterns.withoutMatches, percentage: ((patterns.withoutMatches / total) * 100).toFixed(2) + '%' }
    };
  }

  /**
   * Generate algorithm improvements based on patterns
   */
  async generateAlgorithmImprovements() {
    try {
      const patterns = await this.analyzePatterns();
      const improvements = [];

      // Suggestion 1: If many questions start with same word, improve that word matching
      if (patterns.unmatchedPatterns.length > 0) {
        improvements.push({
          type: 'word_importance',
          priority: 'high',
          suggestion: 'Increase weight for words in unmatched patterns',
          details: `${patterns.unmatchedPatterns[0].pattern} appears in ${patterns.unmatchedPatterns[0].unmatchedCount} unmatched questions`,
          action: 'Add new training data or expand knowledge base for this pattern'
        });
      }

      // Suggestion 2: If confidence is consistently low, review matching algorithm
      const avgConfidence = parseFloat(patterns.confidenceDistribution.average);
      if (avgConfidence < 0.6) {
        improvements.push({
          type: 'algorithm_review',
          priority: 'high',
          suggestion: 'Matching algorithm confidence is low',
          details: `Average confidence: ${avgConfidence}`,
          action: 'Review and adjust scoring weights in matching algorithm'
        });
      }

      // Suggestion 3: Focus on high-volume topics
      if (patterns.topicClumps.length > 0) {
        const topTopic = patterns.topicClumps[0];
        improvements.push({
          type: 'content_focus',
          priority: 'medium',
          suggestion: `Focus on improving ${topTopic.topic} content`,
          details: `${topTopic.messageCount} messages related to this topic`,
          action: 'Expand knowledge base for this topic'
        });
      }

      // Suggestion 4: Common word optimization
      const commonWords = patterns.commonWords.slice(0, 5).map(w => w.word).join(', ');
      improvements.push({
        type: 'semantic_enhancement',
        priority: 'medium',
        suggestion: 'Enhance semantic matching for common terms',
        details: `Common words: ${commonWords}`,
        action: 'Add synonym mappings for these common terms'
      });

      // Save improvements
      this.saveImprovements(improvements);
      return improvements;
    } catch (error) {
      console.error('Error generating improvements:', error);
      throw error;
    }
  }

  /**
   * Get recommendations for algorithm tuning
   */
  async getAlgorithmRecommendations() {
    try {
      return await this.generateAlgorithmImprovements();
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  }

  /**
   * Filter conversations by timeframe
   */
  filterByTimeframe(conversations, timeframe) {
    const now = new Date();
    let daysBack = 7; // default 7 days

    if (timeframe === '24h') daysBack = 1;
    else if (timeframe === '3d') daysBack = 3;
    else if (timeframe === '7d') daysBack = 7;
    else if (timeframe === '30d') daysBack = 30;
    else if (timeframe === '90d') daysBack = 90;

    const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);

    return conversations.filter(conv => 
      new Date(conv.timestamp) >= cutoffDate
    );
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
   * Save patterns to file
   */
  savePatterns(patterns) {
    try {
      const data = {
        patterns,
        lastAnalyzed: new Date()
      };
      fs.writeFileSync(PATTERNS_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving patterns:', error);
    }
  }

  /**
   * Save improvements to file
   */
  saveImprovements(improvements) {
    try {
      const patterns = JSON.parse(fs.readFileSync(PATTERNS_FILE, 'utf8'));
      patterns.improvements = improvements;
      patterns.lastAnalyzed = new Date();
      fs.writeFileSync(PATTERNS_FILE, JSON.stringify(patterns, null, 2));
    } catch (error) {
      console.error('Error saving improvements:', error);
    }
  }
}

export default PatternAnalyzer;
