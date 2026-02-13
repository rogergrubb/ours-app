// ═══════════════════════════════════════════════════════════════════════
// OURS PLATFORM — BACKEND SERVER
// Owner: Chief Programmer (CP)
// Runtime: Node.js 20+ on Hetzner
// Framework: Express with modular route structure
// 
// This is the skeleton. Each chief fills in their domain:
//   CP:    /api/auth, middleware, error handling
//   CDE:   /api/hours, /api/content (data layer)
//   CCOMM: /api/notifications, WebSocket setup
// ═══════════════════════════════════════════════════════════════════════

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';

// Route modules (each chief owns their routes)
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import contentRoutes from './routes/content.js';
import hoursRoutes from './routes/hours.js';
import storefrontRoutes from './routes/storefront.js';
import notificationRoutes from './routes/notifications.js';
import governanceRoutes from './routes/governance.js';
import uploadRoutes from './routes/upload.js';

// Middleware
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/logger.js';
import { authenticate, optionalAuth } from './middleware/auth.js';

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3001;

// ═══ GLOBAL MIDDLEWARE ═══

// Security headers
app.use(helmet());

// CORS — allow Vercel frontend
app.use(cors({
  origin: [
    'https://ours-app.vercel.app',
    'http://localhost:5173',  // Vite dev server
    process.env.FRONTEND_URL,
  ].filter(Boolean),
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());

// Request logging
app.use(requestLogger);

// Rate limiting — global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,                 // 1000 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Slow down.' },
});
app.use('/api/', globalLimiter);

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many auth attempts. Try again later.' },
});

// ═══ HEALTH CHECK ═══

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ═══ API ROUTES ═══

// Auth (rate-limited separately)
app.use('/api/auth', authLimiter, authRoutes);

// Public routes (optional auth — logged-in users get personalized results)
app.use('/api/content', optionalAuth, contentRoutes);

// Protected routes (require authentication)
app.use('/api/users', authenticate, userRoutes);
app.use('/api/hours', authenticate, hoursRoutes);
app.use('/api/storefront', authenticate, storefrontRoutes);
app.use('/api/notifications', authenticate, notificationRoutes);
app.use('/api/governance', authenticate, governanceRoutes);
app.use('/api/upload', authenticate, uploadRoutes);

// ═══ ERROR HANDLING ═══

// 404 for unmatched API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler (must be last)
app.use(errorHandler);

// ═══ START SERVER ═══

server.listen(PORT, () => {
  console.log(`🚀 OURS API running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
});

// Export for WebSocket attachment (CCOMM will attach Socket.io to this server)
export { server, app };
