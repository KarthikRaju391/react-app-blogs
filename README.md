# Drafters

This is a full stack blog application where users can:

-  View blogs by other users
-  Create account to write blogs
-  Bookmark blogs
-  Like blogs
-  Write up drafts!
-  Publish blogs too!

## Deployment

### Railway Deployment

This project is configured to deploy the API backend on Railway. The frontend can be deployed separately on platforms like Netlify or Vercel.

#### Backend (API) Deployment on Railway:

1. Connect your GitHub repository to Railway
2. Create a new project and select your repository
3. Railway will automatically detect the `Dockerfile` in the root directory
4. Set the following environment variables in Railway:
   - `MONGO_URL`: Your MongoDB connection string
   - `JWT_SEC`: Your JWT secret key
   - `PASS_SEC`: Your password encryption secret
   - `PORT`: 4000 (or Railway will set this automatically)

#### Frontend Deployment:

The frontend (`drafters-app`) can be deployed on:
- **Netlify**: Connect your repo and set build directory to `drafters-app`
- **Vercel**: Connect your repo and set root directory to `drafters-app`

Make sure to set the following environment variables for the frontend:
- `VITE_APP_URL`: Your Railway API URL
- `VITE_ACCESS_KEY`: Your Unsplash API key (if using image search)
- `VITE_UNSPLASH_URL`: Unsplash API endpoint

## Local Development

### Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone <your-repo-url>
cd drafters

# Start all services
docker-compose up --build
```

This will start:
- MongoDB on default port
- API server on http://localhost:4000
- Frontend on http://localhost:8000

### Manual Setup

#### Backend (API):
```bash
cd api
npm install
# Set up your .env file based on .env.example
npm start
```

#### Frontend:
```bash
cd drafters-app
npm install
# Set up your environment variables
npm start
```

## Environment Variables

### Backend (.env):
```
MONGO_URL=mongodb://localhost:27017/drafters
JWT_SEC=your_jwt_secret_here
PASS_SEC=your_password_secret_here
PORT=4000
```

### Frontend:
```
VITE_APP_URL=http://localhost:4000/api
VITE_ACCESS_KEY=your_unsplash_access_key
VITE_UNSPLASH_URL=https://api.unsplash.com/search/photos
```

## Application Screenshots

![WhatsApp Image 2022-11-01 at 13 46 07](https://user-images.githubusercontent.com/67912316/200133054-e5863f45-0dd9-45b5-ae59-48bf12afe058.jpg)
![WhatsApp Image 2022-11-01 at 13 46 07](https://user-images.githubusercontent.com/67912316/200133060-a966e7a6-eaae-4791-8ae3-e246fc432e3c.jpg)
![WhatsApp Image 2022-11-01 at 13 46 07](https://user-images.githubusercontent.com/67912316/200133061-94bce9de-89bb-4a20-9d11-bb694d1897c7.jpg)
![WhatsApp Image 2022-11-01 at 13 46 08](https://user-images.githubusercontent.com/67912316/200133065-5dcaf444-c0d9-4175-8ef2-2f620ae266ba.jpg)

## Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Docker

### Frontend:
- React 17
- Vite
- Tailwind CSS
- React Router
- React Quill (Rich text editor)
- FontAwesome Icons

## Features

- **User Authentication**: Secure signup/login with JWT
- **Blog Management**: Create, edit, delete blogs and drafts
- **Rich Text Editor**: Full-featured blog writing experience
- **Social Features**: Like and bookmark blogs
- **Categories**: Organize blogs by categories
- **Responsive Design**: Works on all device sizes
- **Image Integration**: Unsplash integration for cover images
- **Pagination**: Efficient blog browsing
- **Filtering & Sorting**: Multiple ways to organize content