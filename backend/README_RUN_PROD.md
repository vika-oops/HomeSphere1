# Run backend in production (no nodemon)

This backend is ESM (`"type": "module"`), so it should be started with Node directly.

From `c:/HomeSphere1/backend`:

```bat
npm run prod
```

Environment variables:
- uses `dotenv/config` in `server.js` (so a `.env` in `backend/` is picked up if present)

