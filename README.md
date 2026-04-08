# NewsVideo AI Backend

API endpoints for NewsVideo AI - Turn articles into viral videos.

## 🚀 API Endpoints

### GET `/`
Health check endpoint

### POST `/api/generate-script`
Generate video script from news content

**Request body:**
```json
{
  "title": "Breaking News Title",
  "body": "Full news article content..."
}