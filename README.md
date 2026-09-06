# VibeChat

## Deploy to Render

This repository is configured as one Render web service. The backend serves the built Vite frontend in production, so the app uses the same origin for API requests and Socket.IO.

1. Create a new Render Blueprint from this repository. Render will detect `render.yaml`.
2. Set the secret environment variables when prompted:
   - `MONGO_URI`: your MongoDB connection string. Allow Render's outbound IPs or use `0.0.0.0/0` in MongoDB Atlas network access.
   - `JWT_SECRET`: a long, random secret.
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: your Cloudinary credentials.
   - `CLIENT_URL`: the deployed service URL, for example `https://vibechat.onrender.com`.
3. Deploy. Render runs `npm run build`, starts `npm start`, and checks `/health`.

For local development, run `npm install` in both `frontend` and `backend`, then start each app with its existing `npm run dev` script.
