import { trainingData } from './training_data';
import MLService from './MLService';

interface ConversationContext {
  topic: string;
  lastQuestion: string;
  lastResponse: string;
  questionCount: number;
  pythonMode: boolean;
}

class ChatbotService {
  private static instance: ChatbotService;
  private context: ConversationContext;
  private mlService: MLService;

  private constructor() {
    this.mlService = MLService.getInstance();
    this.context = {
      topic: '',
      lastQuestion: '',
      lastResponse: '',
      questionCount: 0,
      pythonMode: false
    };
  }

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  public async getResponse(input: string): Promise<string> {
    const normalizedInput = input.toLowerCase().trim();
    this.context.questionCount++;

    // Handle common acknowledgments with context
    if (this.isAcknowledgment(normalizedInput)) {
      const response = "Is there anything else you'd like to know about our courses, programs, facilities, or how to get started?";
      return this.enhanceResponse(response, normalizedInput);
    }

    // Handle greetings with personalized touch
    if (this.isGreeting(normalizedInput)) {
      const response = "Welcome to GiiT! 👋 I'm your learning assistant. I can help you with:\n" +
        "• Information about our courses and programs\n" +
        "• Details about class schedules and pricing\n" +
        "• Learning formats (online, in-person, hybrid)\n" +
        "• Registration and enrollment\n" +
        "• Programming and technology topics\n\n" +
        "What would you like to know?";
      return this.enhanceResponse(response, normalizedInput);
    }

    // Handle goodbyes with context
    if (this.isGoodbye(normalizedInput)) {
      const response = this.getContextualGoodbye();
      return this.enhanceResponse(response, normalizedInput);
    }

    // Try to find a response
    let response = '';

    // Search through all training data for best match
    response = (await this.findBestMatch(normalizedInput)) ?? '';
    if (response) {
      this.context.lastResponse = response;
      this.context.lastQuestion = normalizedInput;
      return this.enhanceResponse(response, normalizedInput);
    }

    // Default response if no conditions are met
    return this.enhanceResponse(this.getDefaultResponse(normalizedInput), normalizedInput);
  }

  private async enhanceResponse(response: string, input: string): Promise<string> {
    try {
      // Use AI enhancement for richer responses and better context
      if (this.context.questionCount > 0 && response.length < 500) {
        const contextString = `User is asking about GiiT (a tech education institute). Their question: "${input}". Previous topic was: ${this.context.topic || 'not set'}`;
        const enhanced = await this.mlService.enhanceResponse(response, contextString);
        return enhanced || response;
      }
      return response;
    } catch (error) {
      console.error('Error enhancing response:', error);
      return response;
    }
  }

  private getContextualGoodbye(): string {
    return "Thank you for your interest in GiiT! We're here to help you achieve your tech goals. Don't hesitate to reach out with any more questions - call us at +256 745 695 576 or email geniusinstitute2024@gmail.com. Good luck with your learning journey! 🚀";
  }

  /**
   * Find best match from training data using scoring algorithm
   */
  private async findBestMatch(input: string): Promise<string | null> {
    const normalizedInput = input.toLowerCase().trim();

    // First try exact matches
    const exactMatch = trainingData.find(qa =>
      normalizedInput === qa.question.toLowerCase().trim()
    );
    if (exactMatch) {
      this.context.topic = exactMatch.topic;
      return exactMatch.answer;
    }

    // Calculate scores for all Q&A pairs
    let bestMatch = {
      answer: '',
      score: 0,
      topic: ''
    };

    for (const qa of trainingData) {
      const score = this.calculateMatchScore(input, qa);
      if (score > bestMatch.score) {
        bestMatch = { answer: qa.answer, score: score, topic: qa.topic };
      }
    }

    // Return match if confidence is high enough
    if (bestMatch.score >= 0.5) {
      this.context.topic = bestMatch.topic;
      return bestMatch.answer;
    }

    return null;
  }

  private calculateMatchScore(input: string, qa: { question: string; topic?: string }): number {
    const normalizedInput = input.toLowerCase().trim();
    const normalizedQuestion = qa.question.toLowerCase().trim();

    // Check for exact word matches (high priority)
    if (normalizedInput === normalizedQuestion) {
      return 1.0;
    }

    // Common words to ignore
    const commonWords = new Set(['the', 'is', 'at', 'which', 'on', 'in', 'a', 'an', 'and', 'or', 'but', 'do', 'you', 'your', 'have']);
    const inputWords = normalizedInput.split(/\s+/).filter(word => !commonWords.has(word) && word.length > 2);
    const questionWords = normalizedQuestion.split(/\s+/).filter(word => !commonWords.has(word) && word.length > 2);

    if (inputWords.length === 0 || questionWords.length === 0) {
      return 0;
    }

    // Count matching words
    const matchedWords = inputWords.filter(word =>
      questionWords.some(qWord => qWord.includes(word) || word.includes(qWord))
    ).length;

    // Calculate base score (word matching)
    let score = matchedWords / Math.max(inputWords.length, questionWords.length);

    // Semantic matching for synonyms and related terms
    const semanticMap: { [key: string]: string[] } = {
      'price|cost|fee|expensive|afford|payment': ['cost', 'price', 'fee', 'fees', 'price', 'payment'],
      'duration|how long|length|time': ['duration', 'how long', 'length', 'time', 'months'],
      'schedule|when|timing|hours': ['schedule', 'when', 'timing', 'hours', 'time'],
      'location|where|address|campus': ['location', 'where', 'address', 'campus', 'located'],
      'requirements|need|required|prerequisite': ['requirements', 'need', 'required', 'prerequisite'],
      'course|program|class|training': ['course', 'program', 'class', 'training', 'lesson'],
      'register|enroll|signup|join': ['register', 'enroll', 'signup', 'join', 'start'],
      'teacher|instructor|trainer|coach': ['teacher', 'instructor', 'trainer', 'coach', 'mentor'],
      'online|remote|virtual|zoom': ['online', 'remote', 'virtual', 'zoom', 'internet'],
      'inperson|physical|campus|classroom': ['inperson', 'physical', 'campus', 'classroom', 'classroom']
    };

    // Check for semantic matches
    let semanticBonus = 0;
    for (const [variants, terms] of Object.entries(semanticMap)) {
      const inputHasTerm = terms.some(t => normalizedInput.includes(t));
      const questionHasTerm = terms.some(t => normalizedQuestion.includes(t));
      if (inputHasTerm && questionHasTerm) {
        semanticBonus = Math.max(semanticBonus, 0.2);
      }
    }

    // Topic relevance bonus
    let topicBonus = 0;
    if (qa.topic) {
      const inputTopicWords = inputWords.filter(w => qa.topic?.toLowerCase().includes(w) || w.includes(qa.topic?.toLowerCase() || ''));
      if (inputTopicWords.length > 0) {
        topicBonus = 0.1;
      }
    }

    return Math.min(1.0, score + semanticBonus + topicBonus);
  }

  private getDefaultResponse(input: string): string {
    // Provide helpful suggestions based on common topics
    return "I wasn't able to find a specific answer to that question, but here are some topics I can help with:\n\n" +
           "📚 COURSES & PROGRAMS\n" +
           "• Course details and prices\n" +
           "• Programming courses (Python, JavaScript, etc.)\n" +
           "• Web development programs\n" +
           "• AI and Machine Learning\n\n" +
           "🎓 LEARNING\n" +
           "• Class schedules and formats\n" +
           "• Online, in-person, or hybrid options\n" +
           "• Certificate information\n\n" +
           "📝 REGISTRATION\n" +
           "• How to enroll\n" +
           "• Payment options and discounts\n" +
           "• Prerequisites\n\n" +
           "📞 CONTACT\n" +
           "• Phone: +256 745 695 576\n" +
           "• Email: geniusinstitute2024@gmail.com\n\n" +
           "Try asking me about a specific course or topic!";
  }

  private isAcknowledgment(input: string): boolean {
    const acknowledgments = ['ok', 'okay', 'thanks', 'thank you', 'great', 'good', 'alright', 'got it', 'understood', 'perfect', 'cool', 'awesome'];
    return acknowledgments.some(ack => input.toLowerCase().includes(ack));
  }

  private isGreeting(input: string): boolean {
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'welcome', 'start', 'begin'];
    return greetings.some(greeting => input.toLowerCase().includes(greeting));
  }

  private isGoodbye(input: string): boolean {
    const goodbyes = ['bye', 'goodbye', 'see you', 'farewell', 'take care', 'thanks', 'thank you', 'exit', 'quit'];
    return goodbyes.some(goodbye => input.toLowerCase().includes(goodbye));
  }
}

export default ChatbotService;
