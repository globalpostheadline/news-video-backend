import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// OpenAI configuration (optional - add your API key later)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'demo-key',
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'NewsVideo AI Backend is running!',
        endpoints: ['POST /api/generate-script', 'POST /api/generate-video', 'POST /api/publish']
    });
});

// Generate Script using AI
app.post('/api/generate-script', async (req, res) => {
    const { title, body } = req.body;
    
    try {
        // Simple script generation (can be enhanced with OpenAI)
        const sentences = body.split('.');
        const keyPoints = sentences.slice(0, 3);
        
        const script = `🔥 BREAKING: ${title}\n\n📌 ${keyPoints[0] || 'Latest developments'}\n\n📌 ${keyPoints[1] || 'Key updates'}\n\n📌 ${keyPoints[2] || 'What this means'}\n\n🔚 Stay tuned for more updates. Subscribe for breaking news!`;
        
        res.json({ success: true, script });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Generate Video (simulated - returns sample video)
app.post('/api/generate-video', (req, res) => {
    const { title, body, theme, voice, music } = req.body;
    
    // Sample video URLs (replace with actual generated videos)
    const sampleVideos = {
        breaking: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        dark: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        minimal: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        tech: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
    };
    
    const videoUrl = sampleVideos[theme] || sampleVideos.breaking;
    
    res.json({ 
        success: true, 
        videoUrl,
        message: 'Video generated successfully!'
    });
});

// Publish endpoint
app.post('/api/publish', (req, res) => {
    const { title, description, hashtags, platforms } = req.body;
    
    res.json({ 
        success: true, 
        message: `Video would be published to ${platforms.join(', ')}`,
        publishedUrls: platforms.map(p => ({
            platform: p,
            url: `https://${p}.com/watch?v=demo`
        }))
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}`);
});