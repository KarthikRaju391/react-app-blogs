# Drafters

This is a full stack blog application where users can:

-  View blogs by other users
-  Create account to write blogs
-  Bookmark blogs
-  Like blogs
-  Write up drafts!
-  Publish blogs too!
-  Reset forgotten passwords via email OTP

## Deployment

### Railway/Render Deployment

This project is configured to deploy the API backend on Railway or Render. The frontend can be deployed separately on platforms like Netlify or Vercel.

#### Backend (API) Deployment:

1. Connect your GitHub repository to Railway/Render
2. Create a new project and select your repository
3. The platform will automatically detect the `Dockerfile` in the api directory
4. Set the following environment variables:
   - `MONGO_URL`: Your MongoDB connection string
   - `JWT_SEC`: Your JWT secret key
   - `PASS_SEC`: Your password encryption secret
   - `EMAIL_USER`: Your Gmail address (for password reset emails)
   - `EMAIL_PASS`: Your Gmail app password (for password reset emails)
   - `PORT`: 4000 (or the platform will set this automatically)

#### Frontend Deployment:

The frontend (`drafters-app`) can be deployed on:
- **Netlify**: Connect your repo and set build directory to `drafters-app`
- **Vercel**: Connect your repo and set root directory to `drafters-app`

Make sure to set the following environment variables for the frontend:
- `VITE_APP_URL`: Your deployed API URL (e.g., `https://your-app.onrender.com/api`)
- `VITE_ACCESS_KEY`: Your Unsplash API key (if using image search)
- `VITE_UNSPLASH_URL`: Unsplash API endpoint

## Password Reset Feature

The application includes a complete password reset flow:

1. **Forgot Password**: User enters email address
2. **OTP Generation**: System generates 6-digit OTP valid for 10 minutes
3. **Email Delivery**: OTP sent to user's email (or logged to console in development)
4. **OTP Verification**: User enters OTP to verify identity
5. **Password Reset**: User sets new password

### Email Configuration

For production, configure Gmail SMTP:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password for the application
3. Set `EMAIL_USER` to your Gmail address
4. Set `EMAIL_PASS` to the generated App Password

For development without email setup, OTPs will be logged to the console.

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
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=4000
```

### Frontend:
```
VITE_APP_URL=http://localhost:4000/api
VITE_ACCESS_KEY=your_unsplash_access_key
VITE_UNSPLASH_URL=https://api.unsplash.com/search/photos
```

## Troubleshooting

### Password Reset Not Working

1. **Check API URL**: Ensure `VITE_APP_URL` points to your deployed API
2. **Check Routes**: Visit `https://your-api-url.com/` to see available routes
3. **Check Logs**: Look at browser console and server logs for errors
4. **Email Setup**: Verify email credentials are correctly configured

### Common Issues

- **404 Errors**: Usually indicates incorrect API URL or missing routes
- **CORS Errors**: Check that your frontend domain is allowed by the backend
- **Email Not Sending**: Verify Gmail app password and 2FA setup

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
- Nodemailer (Email service)
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
- **Password Reset**: Email-based OTP password recovery
- **Blog Management**: Create, edit, delete blogs and drafts
- **Rich Text Editor**: Full-featured blog writing experience
- **Social Features**: Like and bookmark blogs
- **Categories**: Organize blogs by categories
- **Responsive Design**: Works on all device sizes
- **Image Integration**: Unsplash integration for cover images
- **Pagination**: Efficient blog browsing
- **Filtering & Sorting**: Multiple ways to organize content