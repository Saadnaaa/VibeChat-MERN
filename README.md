# VibeChat

## Deploy to Render

Deploy this repository as one Render Web Service. The backend serves the built Vite frontend, so the app uses the same origin for API requests and Socket.IO.

1. In Render, create a new **Web Service** from this repository.
2. Use these settings:
   - **Root Directory:** leave empty
   - **Runtime:** Node
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
3. Add these environment variables:
   - `MONGO_URI`: your MongoDB connection string. Allow Render's outbound IPs or use `0.0.0.0/0` in MongoDB Atlas network access.
   - `JWT_SECRET`: a long, random secret.
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: your Cloudinary credentials.
   - `CLIENT_URL`: the deployed service URL, for example `https://vibechat.onrender.com`.
   - `NODE_ENV`: `production`
4. Deploy the service. After deployment, open the service URL and verify `/health` returns a JSON success response.

For local development, run `npm install` in both `frontend` and `backend`, then start each app with its existing `npm run dev` script.
