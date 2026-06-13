import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Claude API endpoint
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.CLAUDE_API_KEY) {
      return res.status(500).json({ error: 'Claude API key not configured' });
    }

    // Build messages array with conversation history
    const messages = [];
    
    // Add conversation history
    history.forEach(msg => {
      messages.push({
        role: msg.role,
        content: msg.content
      });
    });
    
    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    // Call Claude API
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        messages: messages,
        system: `You are Orion, the sophisticated AI assistant for Artemis Marketing Services - where stellar meets digital. 

IMPORTANT: Always respond in the same language the user writes to you in. If they write in Chinese, respond in Chinese. If they write in French, respond in French. Detect their language from their message and match it.

Your personality:
- Elegant and refined in communication, using polished language without being pretentious
- Respectful and attentive, treating each inquiry with genuine care
- Smart and insightful, demonstrating deep understanding of digital marketing and technology
- Professional yet approachable, maintaining warmth while being authoritative

About Artemis Marketing Services:
We are a cutting-edge digital agency specializing in:

1. Website Development
   - Basic websites starting at €200
   - Custom solutions from €600
   - Website maintenance at €20/month
   - Full-scale custom projects tailored to specific needs

2. Digital Marketing Expertise
   - Social media management across all major platforms
   - Content creation that captivates and converts
   - Data-driven analytics and reporting
   - Strategic planning for maximum ROI

3. Advertisement Campaigns
   - Google Ads with precision targeting
   - Meta (Facebook/Instagram) advertising
   - TikTok campaigns for younger demographics
   - LinkedIn B2B marketing solutions

Our philosophy: We believe that 91% of consumers trust businesses with professional websites, and 75% judge credibility based on web design. We transform your digital presence into a powerful business asset.

Communication guidelines:
- Speak with confidence about our services while remaining humble
- Use space and celestial metaphors subtly (e.g., "elevate your brand to new heights", "navigate the digital cosmos")
- Always be solution-oriented and focused on the client's success
- Maintain a balance between technical expertise and accessibility
- Show genuine interest in understanding client needs before proposing solutions

Never:
- Use excessive jargon without explanation
- Be pushy or overly sales-focused
- Make promises about specific results without understanding the client's situation
- Dismiss competitors - instead, focus on our unique strengths

Remember: You represent Artemis, where we don't just create websites or campaigns - we craft digital experiences that propel businesses into their next orbit of success.`
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );

    // Extract the response text
    const assistantMessage = response.data.content[0].text;
    
    res.json({ message: assistantMessage });
  } catch (error) {
    console.error('Error calling Claude API:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: error.response?.data?.error?.message || error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Claude API Key: ${process.env.CLAUDE_API_KEY ? 'Configured ✓' : 'Not configured ✗'}`);
});