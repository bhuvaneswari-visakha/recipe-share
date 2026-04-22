# Deployment Guide

## Prerequisites
- GitHub account
- MongoDB Atlas database (already configured)
- Render account (for backend)
- Vercel account (for frontend)

## Backend Deployment (Render)

1. **Go to [render.com](https://render.com)** and sign up/login

2. **Create New Web Service**
   - Click **New +** → **Web Service**
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   - **Name**: `recipe-share-backend` (or your choice)
   - **Root Directory**: `Backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node Server.js`

4. **Add Environment Variables**
   Click "Advanced" and add these:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=1234567890
   ```

5. **Deploy**
   - Click **Create Web Service**
   - Wait for deployment (5-10 minutes)
   - Copy your backend URL (e.g., `https://recipe-share-backend.onrender.com`)

## Frontend Deployment (Vercel)

1. **Update Frontend Environment**
   - Go to your project folder
   - Create `Frontend/.env.production` file:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   Replace with your actual Render backend URL

2. **Push Changes to GitHub**
   ```bash
   git add .
   git commit -m "Add production environment config"
   git push
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click **Add New** → **Project**
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `Frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add Environment Variable:
     - Key: `VITE_API_URL`
     - Value: `https://your-backend-url.onrender.com`
   - Click **Deploy**

4. **Done!**
   - Your frontend will be live at `https://your-project.vercel.app`

## Important Notes

- **CORS**: Make sure your backend allows requests from your Vercel domain
- **Free Tier Limits**: 
  - Render free tier spins down after 15 minutes of inactivity (first request may be slow)
  - Vercel has bandwidth limits
- **Environment Variables**: Never commit `.env` files to GitHub

## Troubleshooting

### Backend not connecting to MongoDB
- Check your MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify `MONGO_URI` in Render environment variables

### Frontend can't reach backend
- Check `VITE_API_URL` is set correctly in Vercel
- Verify backend CORS settings allow your frontend domain

### Images not loading
- Make sure backend serves static files from `/uploads`
- Check image URLs use `${API_URL}/uploads/...`
