# Artemis Backend Server

This backend server handles AI chatbot requests using Claude API.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
1. Copy the `.env` file and add your Claude API key:
```bash
CLAUDE_API_KEY=your_actual_claude_api_key_here
PORT=5000
```

2. Get your Claude API key from: https://console.anthropic.com/

### 3. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### 4. Update Frontend Environment
In the main React app, create a `.env` file with:
```bash
REACT_APP_BACKEND_URL=http://localhost:5000
```

For production, update this to your deployed backend URL.

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the backend directory
3. Follow the prompts
4. Add your environment variables in Vercel dashboard

### Option 2: Deploy to Railway
1. Create account at railway.app
2. Create new project from GitHub
3. Add environment variables
4. Deploy automatically

### Option 3: Deploy to Render
1. Create account at render.com
2. Create new Web Service
3. Connect GitHub repo
4. Add environment variables
5. Deploy

## API Endpoints

- `POST /api/chat` - Send message to AI
  - Body: `{ "message": "user message" }`
  - Response: `{ "message": "AI response" }`

- `GET /health` - Health check
  - Response: `{ "status": "OK", "message": "Server is running" }`

## Testing

Test the backend locally:
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, what services do you offer?"}'
```

## Security Notes

- Never commit `.env` file
- Use environment variables for all sensitive data
- Enable CORS only for your frontend domain in production
- Consider rate limiting for production us.