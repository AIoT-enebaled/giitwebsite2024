# Debugging and Setup Guide

## Overview of Fixes Applied

We've fixed several critical errors in the chatbot implementation:

### 1. **Intern AI API Network Error**
**Problem**: The hardcoded API key was invalid/expired and the API endpoint was unreachable.

**Solution**:
- Moved hardcoded API key to environment variable `VITE_INTERN_AI_API_KEY`
- Added proper API key validation (checks if key exists before making requests)
- Implemented fallback mechanism to local backend, then Hugging Face API

**How it works now**:
1. Tries Intern AI API if `VITE_INTERN_AI_API_KEY` is configured
2. Falls back to local backend if available
3. Falls back to Hugging Face API if `VITE_HUGGING_FACE_API_KEY` is configured
4. Returns empty string if all fail (doesn't crash the chat)

### 2. **Backend Fetch Errors (Failed to fetch)**
**Problem**: 
- `VITE_BACKEND_URL` environment variable wasn't set
- Requests were going to `http://localhost:5000` which doesn't exist in production
- No timeout handling caused requests to hang

**Solution**:
- Added check to skip backend requests if URL is not configured
- Added 5-second timeout for all fetch requests using `AbortController`
- Made all backend requests non-blocking (chat works even if backend fails)
- Added graceful error handling with logging

**How it works now**:
```javascript
// All backend requests check if URL is configured
if (!BACKEND_URL || BACKEND_URL === 'http://localhost:5000') {
  return; // Skip request if not configured
}

// All requests have 5-second timeout
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);
const response = await fetch(url, { signal: controller.signal });
clearTimeout(timeoutId);
```

## Setup Instructions

### Step 1: Configure Environment Variables

Copy the example file and create your own:
```bash
cp .env.example .env.local
```

Then update `.env.local` with your actual values:

```env
# For development (no backend)
VITE_BACKEND_URL=http://localhost:5000

# For production
VITE_BACKEND_URL=https://your-api-server.com

# Get from https://intern.ai
VITE_INTERN_AI_API_KEY=sk_your_actual_key

# Get from https://huggingface.co/settings/tokens
VITE_HUGGING_FACE_API_KEY=hf_your_actual_key
```

### Step 2: Start the Backend (Optional)

The chat works WITHOUT a backend, but recommendations and analytics require it.

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the backend
npm start
# or with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 3: Update VITE_BACKEND_URL

After starting the backend, update your `.env.local`:

```env
VITE_BACKEND_URL=http://localhost:5000
```

### Step 4: Restart Frontend Dev Server

```bash
npm run dev
```

## Testing the Fix

### Without Backend (Chat Only)
1. Leave `VITE_BACKEND_URL` empty or don't set it
2. Chat should work normally
3. Recommendations and analytics tabs won't show data (will fail silently)
4. No errors in console

### With Backend (Full Features)
1. Start the backend on `http://localhost:5000`
2. Set `VITE_BACKEND_URL=http://localhost:5000`
3. Restart dev server
4. Chat + Recommendations + Analytics should all work

### With Intern AI API
1. Get API key from https://intern.ai
2. Set `VITE_INTERN_AI_API_KEY=sk_your_key`
3. Chat will use Intern AI for enhanced responses
4. Falls back to Hugging Face if Intern AI fails

## Error Scenarios & Solutions

### Scenario 1: Network Error from Intern AI API
```
Error: AxiosError: Network Error
```
**Why it happens**: Invalid API key or API endpoint unreachable

**What happens now**:
- Logged as warning, not error
- System tries local backend next
- Then tries Hugging Face
- Chat continues with basic responses

**Solution**:
- Leave `VITE_INTERN_AI_API_KEY` empty if you don't have a valid key
- Use Hugging Face API instead

### Scenario 2: Failed to fetch (Backend URL)
```
TypeError: Failed to fetch at logConversationToBackend
```
**Why it happens**: Backend URL not configured or server not running

**What happens now**:
- Request is skipped if URL not configured
- 5-second timeout prevents hanging
- Chat continues normally
- Logging fails silently

**Solution**:
- Backend is OPTIONAL for chat functionality
- Only needed if you want recommendations/analytics
- Set `VITE_BACKEND_URL` if backend is running

### Scenario 3: Timeout on Slow Network
**Why it happens**: Network is slow, requests take too long

**What happens now**:
- 5-second timeout aborts the request
- Error is caught and logged
- Chat continues with fallback responses
- User doesn't see hanging UI

**Solution**: No action needed, handled automatically

## API Fallback Chain

The chatbot follows this priority for generating responses:

```
User Input
    ↓
ChatbotService.getResponse()
    ↓
Find in training_data
    ↓ (if found)
ChatbotService.enhanceResponse()
    ↓
MLService.generateResponse()
    ├─→ Try Intern AI API (if key configured)
    │   └─→ Timeout: 10 seconds
    ├─→ Try Local Backend API
    │   └─→ Timeout: 5 seconds
    ├─→ Try Hugging Face API (if key configured)
    │   └─→ Timeout: 10 seconds
    └─→ Return empty string (use original response)
```

## Recommendation Engine Integration

### Without Backend:
- Chat works normally
- Recommendations tab shows empty
- Analytics tab shows empty
- User profiles not saved

### With Backend:
- User profiles created automatically
- Personalized recommendations generated
- Learning analytics tracked
- Progress saved

## Monitoring & Debugging

### Check Console for Warnings
All errors are logged as warnings:
```javascript
console.warn('Could not initialize user profile:', error);
console.warn('Could not fetch recommendations:', error);
console.warn('Backend URL not configured, skipping...');
```

### Environment Variables Check
To verify your setup, check if these are set:

**Frontend (.env.local)**:
```bash
# This should not be localhost in production
VITE_BACKEND_URL=your_backend_url

# These are optional but improve chat quality
VITE_INTERN_AI_API_KEY=your_intern_ai_key
VITE_HUGGING_FACE_API_KEY=your_hugging_face_key
```

**Backend (.env)**:
```bash
PORT=5000
NODE_ENV=development
```

## Production Deployment

### Frontend
1. Set `VITE_BACKEND_URL` to your production backend URL
2. Set API keys for external services
3. Build: `npm run build`
4. Deploy dist/ folder

### Backend
1. Deploy to your server/platform
2. Set environment variables on the server
3. Ensure backend is accessible at `VITE_BACKEND_URL`

## Quick Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Chat not responding | MLService APIs failing | Add VITE_HUGGING_FACE_API_KEY |
| Slow responses | Timeout on API calls | Check network, increase timeout |
| Recommendations empty | Backend not running | Start backend or leave it empty |
| Analytics showing errors | Backend auth issues | Check backend logs |
| API errors in console | Keys not configured | Add keys to .env.local |

## Files Modified

1. **src/chatbot/MLService.ts**
   - Moved API key to environment variable
   - Added multiple fallback mechanisms
   - Added local backend support

2. **src/components/ChatBot.tsx**
   - Added timeout to all fetch requests
   - Added backend URL validation
   - Made backend requests optional
   - Added graceful error handling

3. **New Files**
   - `.env.example` - Template for environment variables
   - `DEBUGGING_AND_SETUP_GUIDE.md` - This file

## Next Steps

1. Copy `.env.example` to `.env.local`
2. Add your API keys
3. (Optional) Start backend with `npm start` in backend/
4. Run `npm run dev` to start frontend
5. Test chat functionality
6. Check browser console for warnings
