# Omega B2B E-Commerce Platform

## Project Overview

This is a full-stack B2B (Business-to-Business) e-commerce platform built for Omega Houseware, designed to serve corporate buyers, resellers, and trade partners. The platform provides a comprehensive digital storefront that streamlines business transactions through modern web technologies with enterprise-grade security.

### Target Audience
- **Corporate Buyers**: Businesses purchasing products in bulk for their operations
- **Resellers**: Companies that purchase products to resell to their own customers
- **Distributors**: Wholesale distributors and enterprises engaged in commercial trading relationships

### Core Features
- **Secure Product Discovery**: Browse and search through 500+ SKU catalog with advanced filtering
- **Authenticated Order Placement**: Streamlined ordering process optimized for bulk purchases with JWT authentication
- **Multi-Tier Pricing Programs**: Retail (No MOQ), Wholesale (12+ units), and Bulk Order (100+ units)
- **Account Management**: Comprehensive user and business account management with role-based access
- **Real-time Cart Management**: Add/remove products with live synchronization
- **Order Tracking**: Transaction processing and order status tracking
- **Secure Authentication**: Role-based access control with JWT tokens
- **Admin Portal**: Full order, product, invoice, and analytics management

## Technology Stack

### Frontend
- **Framework**: Next.js 13+ (React with App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: Apollo Client (GraphQL)
- **Real-time Updates**: React hooks with custom logic

### Backend
- **Framework**: NestJS (Node.js/Express)
- **Language**: TypeScript
- **API**: GraphQL with Apollo Server
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: Configured (see config/db.config.ts)
- **Security**: CSRF protection, rate-limiting (with Redis support planned)

## Project Structure

```
E-Commerce-Project/
├── frontend/                          # Next.js frontend application
│   ├── src/
│   │   ├── app/                       # Next.js app directory with layouts
│   │   │   ├── (admin)/               # Admin dashboard routes
│   │   │   ├── (b2b)/                 # B2B portal routes
│   │   │   ├── (consumer)/            # Consumer routes
│   │   │   ├── (public)/              # Public routes
│   │   │   └── api/
│   │   │       ├── cart/              # Cart API
│   │   │       └── orders/            # Secure order API
│   │   │           └── _lib/          # Modular order helpers
│   │   │               ├── constants.ts     # JWT_SECRET, endpoints
│   │   │               ├── types.ts        # Order/JWT types
│   │   │               ├── security.ts    # JWT verification, CSRF
│   │   │               ├── validation.ts  # Order validation logic
│   │   │               ├── products.ts    # Product pricing logic
│   │   │               ├── graphql.ts     # GraphQL client
│   │   │               ├── queries.ts     # GraphQL queries/mutations
│   │   │               └── rateLimit.ts   # Rate limiting
│   │   ├── features/                  # Feature-based modules
│   │   │   ├── auth/                  # Authentication module
│   │   │   ├── cart/                  # Shopping cart module
│   │   │   ├── products/              # Product catalog module
│   │   │   └── inquiry/               # Inquiry form module
│   │   ├── components/                # Shared components
│   │   │   ├── layout/                # Header, navigation, layouts
│   │   │   ├── cards/                 # Product cards
│   │   │   ├── modals/                # Modal components
│   │   │   └── ui/                    # UI primitives
│   │   ├── lib/                       # Utilities and helpers
│   │   └── assets/                    # Static assets (logos, images)
│   └── public/                        # Public assets
│
├── backend/                           # NestJS backend application
│   ├── src/
│   │   ├── app.controller.ts          # Main controller
│   │   ├── app.module.ts              # Root module
│   │   ├── main.ts                    # Application entry point
│   │   ├── config/
│   │   │   └── db.config.ts           # Database configuration
│   │   └── modules/
│   │       ├── admin/                 # Admin module
│   │       │   ├── products/          # Product management
│   │       │   ├── orders/            # Order management
│   │       │   ├── invoices/          # Invoice management
│   │       │   ├── payments/          # Payment processing
│   │       │   └── users-crud/        # User management
│   │       └── general/               # General modules
│   │           ├── auth/              # Authentication service
│   │           ├── mailer/            # Email service
│   │           └── notifications/     # Notification service
│   └── test/                          # Test files
│
└── README.md                          # This file
```

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager
- **Git** (for version control)
- **Postman** or similar tool (optional, for API testing)

### Environment Setup

#### Backend Environment Variables
Create a `.env` file in the `backend/` directory:

```env
PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=development
GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

#### Frontend Environment Variables
Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
JWT_SECRET=your_secure_jwt_secret_key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Step-by-Step Setup Guide

#### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/YOUR_USERNAME/E-Commerce-Project.git
cd E-Commerce-Project
```

#### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

#### 3. Install Frontend Dependencies

Open a new terminal window and run:

```bash
cd frontend
npm install
```

#### 4. Configure Environment Variables

Update the `.env` files in both `backend/` and `frontend/` directories with your configuration.

#### 5. Start the Backend Server

From the `backend/` directory:

```bash
npm run start:dev
```

The backend will start on `http://localhost:3000` (or your configured port).

#### 6. Start the Frontend Application

From the `frontend/` directory (in a separate terminal):

```bash
npm run dev
```

The frontend will typically start on `http://localhost:3000` or `http://localhost:3001`.

#### 7. Access the Application

- **B2B Portal**: http://localhost:3001/b2b/home
- **Admin Dashboard**: http://localhost:3001/admin/dashboard
- **Login Page**: http://localhost:3001/login

## Security Features

### Authentication & Authorization
- **JWT-based Authentication**: Secure token-based user authentication
- **Server-side Token Verification**: All API requests verify JWT tokens server-side
- **Role-based Access Control**: Different permission levels for users, resellers, and admins

### API Security
- **CSRF Protection**: Cross-site request forgery protection on sensitive endpoints
- **Rate Limiting**: Protect against abuse with request rate limiting (Redis support planned)
- **Server-side Pricing**: Prices are validated server-side; client-side prices are untrusted
- **UUID Order Numbers**: Unique identifiers for orders prevent enumeration attacks

### Data Protection
- **Encrypted Passwords**: Secure password hashing in database
- **Environment Variable Secrets**: Sensitive keys stored in `.env` files, never committed
- **Input Validation**: All order payloads validated before processing

## API Endpoints

### Authentication
- `POST /graphql` - GraphQL endpoint for login, logout, and user queries

### Orders
- `POST /api/orders` - Place a new order (requires JWT authentication)

### Cart
- `GET /api/cart` - Get cart contents
- `POST /api/cart` - Add items to cart
- `DELETE /api/cart/:id` - Remove items from cart

## Development

### Backend Development
The backend is built with NestJS following a modular architecture:
- **GraphQL API**: Modern API implementation with Apollo Server
- **Modular Design**: Each feature (products, orders, users, etc.) is a self-contained module
- **TypeScript**: Fully typed for type safety and better developer experience
- Key files:
  - `src/main.ts` - Application entry point
  - `src/app.module.ts` - Root module with all feature imports
  - `src/modules/` - Feature modules organized by domain

### Frontend Development
The frontend uses Next.js 13+ with the App Router:
- **Feature-based Architecture**: Code organized by feature (auth, cart, products, etc.)
- **Type Safety**: Full TypeScript implementation
- **Component Isolation**: Reusable components with clear responsibilities
- **API Integration**: Server-side and client-side integration with GraphQL backend
- Key directories:
  - `src/features/` - Feature-specific logic and components
  - `src/components/` - Shared UI components
  - `src/app/api/` - API routes (orders, cart, etc.)
  - `src/lib/` - Utilities and helper functions

### Development Workflow
1. **Feature Branches**: Create feature branches for new features
2. **Testing**: Run tests before committing
3. **Type Checking**: Use TypeScript compiler to catch errors early
4. **Code Review**: Submit PRs for code review before merging

## Available Scripts

### Backend
```bash
# Development with hot-reload
npm run start:dev

# Production build
npm run build

# Start production server
npm run start

# Run unit tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

### Frontend
```bash
# Development server with hot-reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

## Key Modules & Features

### Frontend Features

#### Authentication (`features/auth/`)
- User login and registration
- JWT token management
- Session persistence
- Role-based UI rendering

#### Shopping Cart (`features/cart/`)
- Add/remove products from cart
- Real-time cart updates
- Cart persistence
- Cart summary and checkout flow

#### Products (`features/products/`)
- Product catalog with 500+ SKUs
- Category-based filtering
- Product search functionality
- Multi-tier pricing display

#### Order Placement (`app/api/orders/`)
- Secure order submission with JWT validation
- Server-side price verification
- CSRF token protection
- Rate limiting to prevent abuse
- Order confirmation and tracking

### Backend Features

#### Product Management (`modules/admin/products/`)
- CRUD operations for products
- Category management
- Pricing tiers (Retail, Wholesale, Bulk)
- Inventory tracking

#### Order Management (`modules/admin/orders/`)
- Order creation and processing
- Order status tracking
- GraphQL queries for order data
- Order history and details

#### User Management (`modules/admin/users-crud/`)
- Business user creation and updates
- Role assignment
- Company profile management

#### Authentication Service (`modules/general/auth/`)
- JWT token generation and verification
- Login mutation and logout handling

## Deployment

Both the frontend and backend can be deployed to your preferred hosting provider:

### Frontend Deployment
- **Vercel** (Recommended for Next.js): Automatic deployments from GitHub
- **Netlify**: Static hosting with serverless functions
- **Self-hosted**: Build and serve with any Node.js hosting

### Backend Deployment
- **Heroku**, **Railway**, or similar Node.js hosts
- **Docker**: Containerize for cloud deployment
- **Kubernetes**: Enterprise-scale deployment

## Performance Considerations

- **Code Splitting**: Next.js automatically chunks code for faster loads
- **Static Generation**: Pre-render pages where possible
- **Image Optimization**: Next.js Image component for responsive images
- **Server-side Caching**: Planned Redis integration for rate-limiting and caching
- **Database Optimization**: Indexed queries for fast product and order lookups

## Environment Variables

### Backend `.env`
```env
PORT=3000
DATABASE_URL=postgresql://user:pass@host/dbname
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=development
GRAPHQL_ENDPOINT=http://localhost:3000/graphql
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/graphql
JWT_SECRET=your_secure_jwt_secret_here
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Important**: Never commit `.env` files to version control. Each environment should have its own secrets.

## Contributing

We use a feature-branch workflow for development:

1. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow the existing code structure and naming conventions
   - Write type-safe TypeScript code
   - Add tests for new functionality

3. **Commit Your Work**
   ```bash
   git commit -m "Add your descriptive message"
   ```

4. **Push to Your Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**
   - Provide a clear description of your changes
   - Link related issues
   - Request review from team members

## Troubleshooting

### Port Already in Use
If port 3000 or 3001 is already in use:
- **Backend**: Update `PORT` in backend `.env`
- **Frontend**: Next.js will automatically use the next available port

### JWT Token Errors
- Ensure `JWT_SECRET` matches between frontend and backend
- Check that tokens are being sent in request headers
- Verify token expiration times

### GraphQL Connection Errors
- Verify `GRAPHQL_ENDPOINT` in frontend `.env.local`
- Ensure backend is running on the correct port
- Check CORS configuration if using different domains

### Database Connection Issues
- Verify `DATABASE_URL` in backend `.env`
- Ensure database service is running
- Check network connectivity

## Project Statistics

- **Frontend**: ~50+ React components and hooks
- **Backend**: ~10+ NestJS modules
- **Product Catalog**: 500+ SKUs across 7 categories
- **Supported Browsers**: Chrome, Firefox, Safari, Edge (latest versions)

## Support & Contact

For questions, bug reports, or feature requests:
- Create an issue in the repository
- Contact the development team
- Check existing documentation and guides

## License

This project is proprietary and confidential. All rights reserved by Omega Houseware.

Unauthorized copying, distribution, or modification is strictly prohibited.

## Changelog

### Latest Updates
- ✅ Security hardening with JWT authentication
- ✅ Server-side pricing validation
- ✅ Modular API architecture
- ✅ Logo branding updates
- ✅ Cart management improvements
- 🚀 Redis integration for rate-limiting (planned)
- 🚀 Payment gateway integration (planned)
