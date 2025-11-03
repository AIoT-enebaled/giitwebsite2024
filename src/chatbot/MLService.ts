import axios from 'axios';

class MLService {
  private static instance: MLService;
  private readonly INTERN_AI_API_KEY = import.meta.env.VITE_INTERN_AI_API_KEY || '';
  private readonly INTERN_AI_API_URL = 'https://api.intern.ai/v1/chat/completions';
  private readonly FALLBACK_API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';
  private readonly FALLBACK_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY || '';
  private readonly LOCAL_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  private constructor() {}

  public static getInstance(): MLService {
    if (!MLService.instance) {
      MLService.instance = new MLService();
    }
    return MLService.instance;
  }

  /**
   * Generate response using multiple fallback options
   */
  public async generateResponse(input: string): Promise<string> {
    try {
      // Try Intern AI API first if key is configured
      if (this.INTERN_AI_API_KEY) {
        try {
          const internAIResponse = await this.callInternAI(input);
          if (internAIResponse) {
            return internAIResponse;
          }
        } catch (error) {
          console.warn('Intern AI API failed:', error);
        }
      } else {
        console.warn('Intern AI API key not configured');
      }

      // Fallback to local backend if available
      try {
        const localResponse = await this.callLocalBackend(input);
        if (localResponse) {
          return localResponse;
        }
      } catch (error) {
        console.warn('Local backend failed:', error);
      }

      // Fallback to Hugging Face if available
      if (this.FALLBACK_API_KEY) {
        try {
          return await this.callHuggingFace(input);
        } catch (error) {
          console.warn('Hugging Face API also failed:', error);
        }
      } else {
        console.warn('Hugging Face API key not configured');
      }
    } catch (error) {
      console.error('All API options exhausted:', error);
    }

    return '';
  }

  /**
   * Call Intern AI API for enhanced responses
   */
  private async callInternAI(input: string): Promise<string> {
    if (!this.INTERN_AI_API_KEY) {
      throw new Error('Intern AI API key not configured');
    }

    try {
      const response = await axios.post(
        this.INTERN_AI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful and knowledgeable assistant for GiiT (Genius Institute of Information Technology), a leading technology education institute in Kampala, Uganda. Provide clear, concise, and accurate information about our courses, programs, facilities, and services.'
            },
            {
              role: 'user',
              content: input
            }
          ],
          temperature: 0.7,
          max_tokens: 500
        },
        {
          headers: {
            'Authorization': `Bearer ${this.INTERN_AI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000
        }
      );

      if (response.data?.choices?.[0]?.message?.content) {
        return response.data.choices[0].message.content.trim();
      }

      return '';
    } catch (error) {
      console.error('Intern AI API error:', error);
      throw error;
    }
  }

  /**
   * Call local backend for enhanced responses
   */
  private async callLocalBackend(input: string): Promise<string> {
    try {
      const response = await fetch(`${this.LOCAL_BACKEND_URL}/api/knowledge/search?query=${encodeURIComponent(input)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
      }

      const data = await response.json();
      if (data.data && Array.isArray(data.data) && data.data.length > 0) {
        const topResult = data.data[0];
        return topResult.description || topResult.title || '';
      }

      return '';
    } catch (error) {
      console.error('Local backend error:', error);
      throw error;
    }
  }

  /**
   * Fallback: Call Hugging Face API
   */
  private async callHuggingFace(input: string): Promise<string> {
    try {
      const response = await axios.post(
        this.FALLBACK_API_URL,
        { inputs: input },
        {
          headers: {
            'Authorization': `Bearer ${this.FALLBACK_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 10000
        }
      );

      if (response.data && response.data[0]?.generated_text) {
        return response.data[0].generated_text;
      }

      return '';
    } catch (error) {
      console.error('Hugging Face API error:', error);
      throw error;
    }
  }

  /**
   * Enhance response using Intern AI with context
   */
  public async enhanceResponse(baseResponse: string, context: string): Promise<string> {
    try {
      const prompt = `Given this context: "${context}", enhance and improve this response to be more helpful and contextually relevant: "${baseResponse}"`;
      const enhancedResponse = await this.generateResponse(prompt);
      return enhancedResponse || baseResponse;
    } catch (error) {
      console.error('Error enhancing response:', error);
      return baseResponse;
    }
  }

  /**
   * Summarize text using Intern AI
   */
  public async summarize(text: string): Promise<string> {
    try {
      const prompt = `Please provide a brief, clear summary of the following text:\n\n${text}`;
      return await this.generateResponse(prompt);
    } catch (error) {
      console.error('Error summarizing:', error);
      return text;
    }
  }

  /**
   * Check if Intern AI API is available
   */
  public async isInternAIAvailable(): Promise<boolean> {
    try {
      const response = await axios.post(
        this.INTERN_AI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'Hi' }],
          max_tokens: 10
        },
        {
          headers: {
            'Authorization': `Bearer ${this.INTERN_AI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          timeout: 5000
        }
      );
      return !!response.data?.choices?.[0]?.message?.content;
    } catch (error) {
      console.warn('Intern AI API not available:', error);
      return false;
    }
  }
}

export default MLService;
