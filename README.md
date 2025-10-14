# Real-Time Chat Backend

A robust NestJS backend application that provides real-time messaging capabilities with WebSocket support, message persistence, and analytics. This application serves as the backend for a real-time chat system with advanced features like sentiment analysis, message statistics, and live data broadcasting.

## https://github.com/muhammadyasir14/nestjs.git 
## Overview

This application is built with NestJS and provides:

- **Real-time messaging** via WebSocket connections using Socket.IO
- **Message persistence** with PostgreSQL database
- **Message analytics** including sentiment analysis and statistics
- **RESTful API** for message management
- **CORS support** for cross-origin requests
- **Input validation** with class-validator
- **TypeORM integration** for database operations

### Key Features

-  **Real-time messaging** with WebSocket support
-  **Message analytics** and statistics
-  **Sentiment analysis** for message content
-  **Message persistence** with PostgreSQL
-  **Live statistics broadcasting**
-  **Input validation** and error handling
-  **CORS configuration** for frontend integration

##  Architecture

The application follows a modular NestJS architecture:

```
src/
├── messages/           # Message management module
│   ├── dto/           # Data Transfer Objects
│   ├── schemas/       # Database entities
│   ├── messages.controller.ts
│   ├── messages.service.ts
│   └── messages.module.ts
├── realtime/          # WebSocket gateway module
│   ├── realtime.gateway.ts
│   └── realtime.module.ts
├── stats/             # Statistics module
│   ├── stats.controller.ts
│   └── stats.module.ts
└── app.module.ts      # Main application module
```


##  Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- npm 
- PostgreSQL database
- Git

## https://github.com/muhammadyasir14/nestjs.git Getting Started

### 1. Clone the Repository

```bash
git clone <https://github.com/muhammadyasir14/nestjs.git>
cd nestjs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
CORS_ORIGINS=https://realtimechat1.netlify.app
```

### 4. Database Setup

Ensure your PostgreSQL database is running and accessible with the credentials specified in your `.env` file. The application will automatically create the necessary tables on startup.

### 5. Run the Application

#### Development Mode
```bash
npm run start:dev
```

#### Production Mode
```bash
npm run build
npm run start:prod
```







### Live Applications

- **Backend API**: [https://nestjs-9r3w.onrender.com/api](https://nestjs-9r3w.onrender.com/api)
- **Frontend**: [https://realtimechat1.netlify.app/](https://realtimechat1.netlify.app/)

### Deployment Notes

The application is currently deployed on:
- **Backend**: Render.com
- **Frontend**: Netlify