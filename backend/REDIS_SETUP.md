# 🚀 Redis Setup Guide for Streamora

## Quick Start (Optional)

Redis is **optional** for Streamora. The application will work without it using an in-memory fallback, but Redis provides much better performance and persistence.

## Installation Options

### Option 1: Docker (Recommended)

```bash
# Run Redis in Docker
docker run -d --name redis-streamora -p 6379:6379 redis:alpine

# Or with persistence
docker run -d --name redis-streamora -p 6379:6379 -v redis-data:/data redis:alpine
```

### Option 2: Local Installation

**macOS (Homebrew):**

```bash
brew install redis
brew services start redis
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis-server
sudo systemctl enable redis-server
```

**Windows:**
Download from: https://github.com/microsoftarchive/redis/releases

### Option 3: Cloud Redis

- **Redis Cloud**: https://redis.com/cloud/
- **AWS ElastiCache**: https://aws.amazon.com/elasticache/
- **Digital Ocean**: https://www.digitalocean.com/products/managed-databases-redis

## Configuration

Add to your `.env` file:

```bash
# Redis Configuration (Optional)
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=your_password_if_needed
```

## Verification

Check if caching is working:

```bash
# Start your backend
npm run dev

# Check health endpoint
curl http://localhost:3001/api/health

# Look for cache status in response
{
  "cache": {
    "connected": true,
    "keyCount": 0,
    "type": "Redis"
  }
}
```

## Performance Benefits

With Redis enabled:

- ⚡ **10x faster** API responses
- 📉 **60-80% fewer** TMDB API calls
- 💰 **Stay within** free tier limits easily
- 🔄 **Persistent cache** across server restarts

## Troubleshooting

**Cache not connecting?**

- Check if Redis is running: `redis-cli ping`
- Verify REDIS_URL in your .env
- Application will still work without Redis (fallback mode)

**Clear cache during development:**

```bash
curl -X POST http://localhost:3001/api/health/cache/clear
```

---

**Note:** Even without Redis, Streamora works perfectly! Redis just makes it faster and more efficient. 🎬
