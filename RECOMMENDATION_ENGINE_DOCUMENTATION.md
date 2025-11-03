# Recommendation Engine Service Documentation

## Overview
The Recommendation Engine is a backend service that provides personalized learning recommendations based on user behavior, interests, and learning progress. It tracks user profiles, generates custom learning paths, and analyzes learning patterns.

## Features

### 1. User Profile Management
- Create and maintain user profiles with learning preferences
- Track interests and learning level (beginner, intermediate, advanced, expert)
- Monitor learning progress and activity history
- Store personalized learning styles

### 2. Personalized Recommendations
Uses three recommendation strategies:
- **Interest-Based**: Recommends topics aligned with user interests
- **Related Topics**: Suggests topics related to completed courses
- **Level Progression**: Recommends courses matching user's learning level

### 3. Progress Tracking
- Track time spent on each topic
- Record quiz scores and completion status
- Monitor learning streaks and consistency
- Store user notes and feedback

### 4. Learning Analytics
- Calculate total learning hours
- Track topic completion rates
- Analyze learning streaks
- Generate performance metrics

### 5. Learning Path Generation
- Create personalized learning paths based on user profile
- Estimate duration for the complete path
- Provide step-by-step recommendations
- Include contextual notes and tips

## API Endpoints

### User Profile Management

#### Create/Update User Profile
```
POST /api/recommendations/user/profile
Content-Type: application/json

{
  "userId": "user123",
  "name": "John Doe",
  "email": "john@example.com",
  "learningLevel": "beginner",
  "interests": ["python", "web-development"],
  "learningStyle": "visual"
}

Response:
{
  "success": true,
  "data": {
    "id": "user123",
    "name": "John Doe",
    "learningLevel": "beginner",
    "interests": ["python", "web-development"],
    "enrolledCourses": [],
    "completedTopics": [],
    "totalLearningHours": 0,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get User Profile
```
GET /api/recommendations/user/:userId/profile

Response:
{
  "success": true,
  "data": {
    "id": "user123",
    "name": "John Doe",
    "learningLevel": "beginner",
    "interests": ["python", "web-development"],
    "completedTopics": ["Python Basics", "Variables and Data Types"],
    "totalLearningHours": 12,
    "lastActivityDate": "2024-01-15T14:20:00Z"
  }
}
```

### Recommendations

#### Get Personalized Recommendations
```
GET /api/recommendations/user/:userId/recommendations?limit=5

Response:
{
  "success": true,
  "data": [
    {
      "subject": "python",
      "topic": "Control Structures",
      "description": "If statements, loops, and conditional logic",
      "level": "beginner",
      "duration": "2 weeks",
      "score": 85,
      "reason": "Related to your interest in python",
      "type": "interest_based"
    },
    {
      "subject": "web-development",
      "topic": "HTML Basics",
      "description": "Introduction to HTML and web structure",
      "level": "beginner",
      "duration": "1 week",
      "score": 78,
      "reason": "Related to topics you've completed",
      "type": "related"
    }
  ]
}
```

#### Get Recommended Learning Path
```
GET /api/recommendations/user/:userId/learning-path

Response:
{
  "success": true,
  "data": {
    "userId": "user123",
    "currentLevel": "beginner",
    "recommendedPath": [
      {
        "order": 1,
        "subject": "python",
        "topic": "Control Structures",
        "level": "beginner",
        "duration": "2 weeks",
        "difficulty": "Easy",
        "estimatedTimePerWeek": "5-10 hours"
      },
      {
        "order": 2,
        "subject": "python",
        "topic": "Functions",
        "level": "beginner",
        "duration": "2 weeks",
        "difficulty": "Easy"
      }
    ],
    "estimatedTotalDuration": "2 months",
    "notes": [
      "As a beginner, start with foundational topics and practice regularly.",
      "This path aligns with your interests in: python, web-development.",
      "Complete topics at your own pace and take quizzes to reinforce learning."
    ]
  }
}
```

### Progress Tracking

#### Update User Progress
```
POST /api/recommendations/user/:userId/progress
Content-Type: application/json

{
  "courseId": "python101",
  "topicTitle": "Python Basics",
  "status": "completed",
  "timeSpent": 120,
  "quizScore": 85,
  "notes": "Completed all exercises and quiz"
}

Response:
{
  "success": true,
  "data": {
    "id": "progress-1234567890",
    "userId": "user123",
    "courseId": "python101",
    "topicTitle": "Python Basics",
    "status": "completed",
    "timeSpent": 120,
    "quizScore": 85,
    "completedAt": "2024-01-15T15:00:00Z",
    "updatedAt": "2024-01-15T15:00:00Z"
  }
}
```

### Analytics

#### Get User Learning Analytics
```
GET /api/recommendations/user/:userId/analytics

Response:
{
  "success": true,
  "data": {
    "userId": "user123",
    "userName": "John Doe",
    "learningLevel": "beginner",
    "interests": ["python", "web-development"],
    "topicsCompleted": 5,
    "topicsInProgress": 2,
    "totalTopicsTracked": 7,
    "totalLearningHours": 12,
    "averageQuizScore": 82,
    "learningStreak": 5,
    "completedTopics": ["Python Basics", "Variables and Data Types", ...],
    "joinDate": "2024-01-15T10:30:00Z",
    "lastActivityDate": "2024-01-15T14:20:00Z"
  }
}
```

### User Preferences

#### Update User Interests
```
PUT /api/recommendations/user/:userId/interests
Content-Type: application/json

{
  "interests": ["python", "artificial-intelligence", "data-science"]
}

Response:
{
  "success": true,
  "data": {
    "id": "user123",
    "interests": ["python", "artificial-intelligence", "data-science"],
    "updatedAt": "2024-01-15T16:00:00Z"
  }
}
```

#### Update User Learning Level
```
PUT /api/recommendations/user/:userId/level
Content-Type: application/json

{
  "level": "intermediate"
}

Response:
{
  "success": true,
  "data": {
    "id": "user123",
    "learningLevel": "intermediate",
    "updatedAt": "2024-01-15T16:00:00Z"
  }
}
```

## Data Storage

The Recommendation Engine stores data in JSON files:

- **users.json**: User profiles and preferences
- **recommendations.json**: Generated recommendations for users
- **progress.json**: User progress on topics and courses

All files are stored in the `backend/data/` directory.

## Integration with ChatBot

The ChatBot can integrate with the Recommendation Engine by:

1. **Creating user profiles** when users start chatting
2. **Logging conversations** to the LearningSystem
3. **Fetching recommendations** to personalize responses
4. **Tracking progress** when users complete topics
5. **Displaying personalized suggestions** in the chat interface

### Example Integration
```javascript
// Create user profile
await fetch('/api/recommendations/user/profile', {
  method: 'POST',
  body: JSON.stringify({
    userId: 'chat-user-123',
    name: 'User Name',
    learningLevel: 'beginner',
    interests: ['python']
  })
});

// Get personalized recommendations
const recs = await fetch('/api/recommendations/user/chat-user-123/recommendations?limit=5');
const recommendations = await recs.json();

// Update progress
await fetch('/api/recommendations/user/chat-user-123/progress', {
  method: 'POST',
  body: JSON.stringify({
    courseId: 'python101',
    topicTitle: 'Python Basics',
    status: 'completed',
    timeSpent: 120,
    quizScore: 85
  })
});
```

## Key Concepts

### Learning Levels
- **Beginner**: Foundation and basics
- **Intermediate**: Build on fundamentals
- **Advanced**: Complex concepts and practices
- **Expert**: Mastery level content

### Recommendation Scoring
Recommendations are scored based on:
- User interest match (30 points)
- Learning level alignment (20 points)
- Relation to completed topics (25 points)
- Topic type and duration (10-15 points)

### Learning Streaks
Tracks consecutive days of learning activity. Reset if user doesn't learn for a full day.

### Progress Statuses
- **in_progress**: Currently learning
- **completed**: Finished and quizzed
- **abandoned**: Started but not completed

## Future Enhancements

- Integration with ML algorithms for better recommendations
- Collaborative filtering based on similar users
- A/B testing for recommendation algorithms
- User preference learning over time
- Adaptive difficulty adjustment
- Time-based recommendations (suggest study duration)

## Error Handling

The service includes comprehensive error handling for:
- Missing user profiles
- Invalid input data
- File system errors
- Concurrent access issues

All errors return appropriate HTTP status codes and error messages.
