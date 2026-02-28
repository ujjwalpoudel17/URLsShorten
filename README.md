# Rate Limiter URL Shortner

A full-stack URL shortener with analytics and rate-limiting.

### Features

- Shorten long URLs into 6-character aliases
- IP-based rate limiting (max 5 requests/min)
- Analytics dashboard with 7-day click tracking
- Refreshable charts without full page reload
- Frontend: Vanilla JS + Tailwind CSS
- Backend: Node.js, Express, MongoDB

### Rate Limiter Logic

- Rate limiter is IP-based
- Stores `{count, startTime}` per IP in memory
- Maximum 5 requests per 60 seconds
- Returns 429 status with countdown if limit exceeded

### Setup Instructions

1. Clone the repo:

```bash
git clone <your-repo-url>
cd smart-url-shortener