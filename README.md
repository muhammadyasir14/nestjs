# Real-Time Chat Backend

A robust NestJS backend application that provides real-time messaging capabilities with WebSocket support, message persistence, and analytics. This application serves as the backend for a real-time chat system with advanced features like sentiment analysis, message statistics, and live data broadcasting.

## 🚀 Overview

This application is built with NestJS and provides:

- **Real-time messaging** via WebSocket connections using Socket.IO
- **Message persistence** with PostgreSQL database
- **Message analytics** including sentiment analysis and statistics
- **RESTful API** for message management
- **CORS support** for cross-origin requests
- **Input validation** with class-validator
- **TypeORM integration** for database operations

### Key Features

- 📨 **Real-time messaging** with WebSocket support
- 📊 **Message analytics** and statistics
- 🎯 **Sentiment analysis** for message content
- 💾 **Message persistence** with PostgreSQL
- 🔄 **Live statistics broadcasting**
- 🛡️ **Input validation** and error handling
- 🌐 **CORS configuration** for frontend integration

## 🏗️ Architecture

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

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **WebSocket**: Socket.IO
- **Validation**: class-validator & class-transformer
- **Language**: TypeScript
- **Runtime**: Node.js

##  Prerequisites

Before running this application, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/muhammadyasir14/nestjs.git
cd nestjs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

### 3. Run the Application

#### Development Mode
```bash
npm run start:dev
```

#### Production Mode
```bash
npm run build
npm run start:prod
```