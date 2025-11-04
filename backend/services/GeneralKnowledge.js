import knowledgeData from '../data/knowledge.js';

/**
 * General Knowledge Service - Provides educational content
 */
class GeneralKnowledge {
  constructor() {
    this.knowledge = knowledgeData;
  }

  /**
   * Get knowledge about a subject and specific topic
   */
  async getKnowledge(subject, topic) {
    try {
      subject = subject.toLowerCase();
      
      if (!this.knowledge[subject]) {
        return null;
      }

      if (!topic) {
        // Return overview if no specific topic
        return this.knowledge[subject].overview;
      }

      topic = topic.toLowerCase().replace(/-/g, ' ');
      
      const content = this.knowledge[subject].content;
      const found = content.find(item => 
        item.title.toLowerCase().replace(/-/g, ' ') === topic ||
        item.title.toLowerCase().includes(topic)
      );

      return found || null;
    } catch (error) {
      console.error('Error getting knowledge:', error);
      throw error;
    }
  }

  /**
   * Search across all knowledge bases
   */
  async search(query) {
    try {
      query = query.toLowerCase();
      const results = [];

      Object.entries(this.knowledge).forEach(([subject, data]) => {
        data.content?.forEach(item => {
          if (
            item.title.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            item.content?.toLowerCase().includes(query)
          ) {
            results.push({
              subject,
              title: item.title,
              description: item.description,
              relevance: this.calculateRelevance(query, item)
            });
          }
        });
      });

      // Sort by relevance
      return results.sort((a, b) => b.relevance - a.relevance).slice(0, 10);
    } catch (error) {
      console.error('Error searching knowledge:', error);
      throw error;
    }
  }

  /**
   * Get learning path recommendations
   */
  async getLearningPath(level = 'beginner', interest = null) {
    try {
      const paths = [];

      if (interest) {
        interest = interest.toLowerCase();
        const subjectPath = this.knowledge[interest];
        
        if (subjectPath) {
          return {
            subject: interest,
            level,
            path: this.generatePath(subjectPath, level),
            estimatedDuration: `${subjectPath.estimatedHours || 40} hours`
          };
        }
      }

      // If no specific interest, recommend based on level
      Object.entries(this.knowledge).forEach(([subject, data]) => {
        paths.push({
          subject,
          level,
          path: this.generatePath(data, level),
          estimatedDuration: `${data.estimatedHours || 40} hours`
        });
      });

      return paths;
    } catch (error) {
      console.error('Error getting learning path:', error);
      throw error;
    }
  }

  /**
   * Generate learning path based on level
   */
  generatePath(subjectData, level) {
    const allContent = subjectData.content || [];
    
    let filtered = allContent;
    
    if (level === 'beginner') {
      filtered = allContent.filter(item => 
        !item.level || item.level === 'beginner' || item.level === 'foundational'
      ).slice(0, 5);
    } else if (level === 'intermediate') {
      filtered = allContent.filter(item => 
        !item.level || item.level === 'intermediate' || item.level === 'advanced'
      ).slice(0, 7);
    } else if (level === 'advanced') {
      filtered = allContent.filter(item => 
        item.level === 'advanced' || item.level === 'expert'
      );
    }

    return filtered.map(item => ({
      title: item.title,
      duration: item.duration || '2 weeks'
    }));
  }

  /**
   * Calculate relevance score for search results
   */
  calculateRelevance(query, item) {
    let score = 0;
    
    if (item.title.toLowerCase().includes(query)) score += 3;
    if (item.description?.toLowerCase().includes(query)) score += 2;
    if (item.content?.toLowerCase().includes(query)) score += 1;
    
    return score;
  }

  /**
   * Get related topics
   */
  async getRelatedTopics(subject, topic) {
    try {
      const item = await this.getKnowledge(subject, topic);
      if (!item || !item.relatedTopics) {
        return [];
      }
      return item.relatedTopics;
    } catch (error) {
      console.error('Error getting related topics:', error);
      throw error;
    }
  }

  /**
   * Get available subjects
   */
  async getAvailableSubjects() {
    try {
      return Object.keys(this.knowledge).map(subject => ({
        subject,
        overview: this.knowledge[subject].overview,
        topicCount: this.knowledge[subject].content?.length || 0,
        estimatedHours: this.knowledge[subject].estimatedHours || 0
      }));
    } catch (error) {
      console.error('Error getting available subjects:', error);
      throw error;
    }
  }
}

export default GeneralKnowledge;
