// server.js - CommonJS version (works on Render)
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'NewsVideo AI Backend is running!',
        endpoints: ['POST /api/generate-script', 'POST /api/generate-video', 'POST /api/publish']
    });
});

// Generate Script
app.post('/api/generate-script', (req, res) => {
    const { title, body } = req.body;
    
    const sentences = body.split('.');
    const keyPoints = sentences.slice(0, 3);
    
    const script = `🔥 BREAKING: ${title}\n\n📌 ${keyPoints[0] || 'Latest developments'}\n\n📌 ${keyPoints[1] || 'Key updates'}\n\n📌 ${keyPoints[2] || 'What this means'}\n\n🔚 Stay tuned for more updates. Subscribe for breaking news!`;
    
    res.json({ success: true, script });
});

// Generate Video
app.post('/api/generate-video', (req, res) => {
    const { title, body, theme } = req.body;
    
    const sampleVideos = {
        breaking: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        dark: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        minimal: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        tech: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'
    };
    
    const videoUrl = sampleVideos[theme] || sampleVideos.breaking;
    
    res.json({ success: true, videoUrl });
});

// Publish endpoint
app.post('/api/publish', (req, res) => {
    const { title, description, hashtags, platforms } = req.body;
    
    res.json({ 
        success: true, 
        message: `Video would be published to ${platforms.join(', ')}`
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
