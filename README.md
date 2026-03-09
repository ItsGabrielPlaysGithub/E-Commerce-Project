# B2B E-Commerce Platform

## Project Overview

This is a full-stack B2B (Business-to-Business) e-commerce platform designed to serve corporate buyers, resellers, and trade partners. The platform provides a comprehensive digital storefront that streamlines business transactions through modern web technologies.

### Target Audience
- **Corporate Buyers**: Businesses purchasing products in bulk for their operations
- **Resellers**: Companies that purchase products to resell to their own customers
- **Trade Partners**: Business partners engaged in commercial trading relationships

### Core Features
- **Product Discovery**: Browse and search through product catalogs with advanced filtering
- **Order Placement**: Streamlined ordering process optimized for bulk purchases
- **Account Management**: Comprehensive user and business account management
- **Transaction Workflows**: Basic transaction processing and order tracking

## Technology Stack

### Frontend
- **Framework**: Next.js (React-based framework)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

### Backend
- **Framework**: NestJS (Node.js framework)
- **Language**: TypeScript

## Project Structure

```
E-Commerce-Project/
├── frontend/          # Next.js frontend application
│   ├── app/          # Next.js app directory (pages and layouts)
│   ├── features/     # Feature-based modules
│   │   └── sample-module1/
│   │       ├── components/
│   │       ├── services/
│   │       └── types/
│   └── public/       # Static assets
│
├── backend/          # NestJS backend application
│   ├── src/         # Source code
│   └── test/        # Test files
│
└── README.md        # This file
```

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Git** (for cloning the repository)

### Step-by-Step Setup Guide

#### 1. Clone the Repository from GitHub

Open your terminal or command prompt and run:

```bash
git clone https://github.com/YOUR_USERNAME/E-Commerce-Project.git
```

*Note: Replace `YOUR_USERNAME` with your actual GitHub username or organization name.*

#### 2. Navigate to the Project Directory

```bash
cd E-Commerce-Project
```

#### 3. Install Backend Dependencies

Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

#### 4. Install Frontend Dependencies

Open a new terminal window, navigate to the frontend folder, and install dependencies:

```bash
cd frontend
npm install
```

#### 5. Run the Backend Server

From the backend directory:

```bash
npm run start:dev
```

The backend server will typically start on `http://localhost:3000` (or the port configured in your environment).

#### 6. Run the Frontend Application

From the frontend directory (in a separate terminal):

```bash
npm run dev
```

The frontend application will typically start on `http://localhost:3000` or `http://localhost:3001` if port 3000 is already in use.

#### 7. Access the Application

Open your web browser and navigate to the frontend URL (usually `http://localhost:3000` or `http://localhost:3001`).

## Development

### Backend Development
The backend is built with NestJS and follows a modular architecture. Key files:
- `src/main.ts` - Application entry point
- `src/app.module.ts` - Root module

### Frontend Development
The frontend uses Next.js 13+ with the App Router. Features are organized in a modular structure under the `features/` directory.

## Available Scripts

### Backend
- `npm run start` - Start the production server
- `npm run start:dev` - Start the development server with hot-reload
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint

## Environment Variables

Create `.env` files in both the frontend and backend directories as needed for your environment configuration.

### Backend `.env` example:
```
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### Frontend `.env.local` example:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private/proprietary. All rights reserved.

## Support

For questions or support, please contact the development team.
