require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_REGION',
    'SES_FROM_EMAIL'
];

const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingVars.join(', '));
    console.error('Please check your .env file and ensure all required variables are set.');
    process.exit(1);
}

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const { initSES } = require('./config/sesConfig');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const pollRoutes = require('./routes/polls');
const postRoutes = require('./routes/posts');
const notificationRoutes = require('./routes/notifications');
const emailRoutes = require('./routes/email');

// Initialize express app
const app = express();

// Trust first proxy (nginx) — required for express-rate-limit behind reverse proxy
app.set('trust proxy', 1);

// Create HTTP server for Socket.IO
const server = http.createServer(app);

/* =======================================================================
   CORS CONFIGURATION (Fixed for Admin Panel + Mobile App)
   =======================================================================
*/
const corsOrigin = process.env.FRONTEND_URL;
const adminPanelUrl = process.env.ADMIN_PANEL_URL;

// FIX 1: Explicitly include all needed origins here
const allowedOrigins = [
    corsOrigin,                                  // From .env (Mobile App / Production)
    adminPanelUrl,                               // From .env (Admin Panel)
    'http://localhost:5173',                     // Vite Frontend (Local Admin Panel)
    'http://localhost:8081',                     // React Native (Local App)
    'https://project-1-admin-panel.vercel.app'   // Hardcoded Admin Panel (Safety)
].filter(Boolean); // removes null/undefined

console.log('=== CORS Configuration ===');
console.log('Allowed Origins:', allowedOrigins);
console.log('========================');

// Initialize Socket.IO with secure CORS
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
});

// Store io instance globally for use in controllers
global.io = io;

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // User joins their personal room for notifications
    socket.on('join', (userId) => {
        try {
            // Validate userId before joining
            if (userId && typeof userId === 'string' && userId.match(/^[0-9a-fA-F]{24}$/)) {
                socket.join(userId);
                console.log(`User ${userId} joined their notification room`);
            } else {
                console.error('Invalid userId provided for socket join:', userId);
                socket.emit('error', { message: 'Invalid user ID' });
            }
        } catch (error) {
            console.error('Error joining socket room:', error);
            socket.emit('error', { message: 'Failed to join notification room' });
        }
    });

    // Handle socket errors
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Connect to MongoDB
connectDB();

// Initialize AWS SES
initSES().catch(err => console.error('SES init error:', err.message));

if (!corsOrigin && process.env.NODE_ENV === 'production') {
    console.warn('WARNING: FRONTEND_URL environment variable is not set in production mode.');
}

// FIX 2: Express CORS Middleware with 'x-admin-token' allowed
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked request from origin: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],

    // *** CRITICAL FIX FOR ADMIN LOGIN ***
    allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-token'],

    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600, // Cache preflight for 10 minutes
}));

app.use(express.json({ limit: '10mb' })); // Limit request body size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploaded images
app.use('/uploads', express.static('uploads'));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/email', emailRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Polling App API is running',
        version: '1.0.0',
        allowedOrigins: allowedOrigins
    });
});

// Deep link redirect for shared polls
// When someone clicks a shared poll link, this page opens the poll in the app
app.get('/poll/:pollId', async (req, res) => {
    const { pollId } = req.params;
    const customScheme = `thoughts://poll/${pollId}`;
    const intentUri = `intent://poll/${pollId}#Intent;scheme=thoughts;package=com.deepangokul.thoughts;end`;

    // Try to fetch the poll question for a nicer preview
    let pollQuestion = 'Check out this poll on Thoughts!';
    try {
        const Poll = require('./models/Poll');
        const poll = await Poll.findById(pollId);
        if (poll) {
            pollQuestion = poll.question;
        }
    } catch (err) {
        // Ignore - use default question
    }

    res.send(`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Thoughts - ${pollQuestion}</title>
    <meta property="og:title" content="Vote on Thoughts">
    <meta property="og:description" content="${pollQuestion}">
    <meta property="og:type" content="website">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .card { background: white; border-radius: 16px; padding: 32px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
        .logo { font-size: 28px; font-weight: 700; color: #458FD0; margin-bottom: 16px; }
        .question { font-size: 18px; color: #101720; margin-bottom: 24px; line-height: 1.5; }
        .btn { display: inline-block; background: #458FD0; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px; font-weight: 600; cursor: pointer; }
        .sub { margin-top: 16px; font-size: 13px; color: #687684; }
    </style>
</head>
<body>
    <div class="card">
        <div class="logo">Thoughts</div>
        <p class="question">${pollQuestion}</p>
        <a id="openBtn" class="btn">Open in App</a>
        <p class="sub">Tap the button to open in Thoughts</p>
    </div>
    <script>
        var isAndroid = /android/i.test(navigator.userAgent);
        var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
        var btn = document.getElementById('openBtn');

        if (isAndroid) {
            // Android Intent URI — works inside WhatsApp/Instagram in-app browsers
            btn.href = "${intentUri}";
            // Auto-redirect via intent
            window.location.href = "${intentUri}";
        } else if (isIOS) {
            // iOS — use custom scheme
            btn.href = "${customScheme}";
            window.location.href = "${customScheme}";
        } else {
            btn.href = "${customScheme}";
        }
    </script>
</body>
</html>`);
});

// Deep link redirect for shared profiles
app.get('/profile/:username', (req, res) => {
    const { username } = req.params;
    const customScheme = `thoughts://profile/${username}`;
    const intentUri = `intent://profile/${username}#Intent;scheme=thoughts;package=com.deepangokul.thoughts;end`;

    res.send(`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Thoughts - @${username}</title>
    <meta property="og:title" content="@${username} on Thoughts">
    <meta property="og:description" content="Check out @${username}'s profile on Thoughts!">
    <meta property="og:type" content="profile">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
        .card { background: white; border-radius: 16px; padding: 32px; max-width: 400px; width: 90%; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
        .logo { font-size: 28px; font-weight: 700; color: #458FD0; margin-bottom: 16px; }
        .question { font-size: 18px; color: #101720; margin-bottom: 24px; line-height: 1.5; }
        .btn { display: inline-block; background: #458FD0; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-size: 16px; font-weight: 600; cursor: pointer; }
        .sub { margin-top: 16px; font-size: 13px; color: #687684; }
    </style>
</head>
<body>
    <div class="card">
        <div class="logo">Thoughts</div>
        <p class="question">Check out @${username}'s profile</p>
        <a id="openBtn" class="btn">Open in App</a>
        <p class="sub">Tap the button to open in Thoughts</p>
    </div>
    <script>
        var isAndroid = /android/i.test(navigator.userAgent);
        var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
        var btn = document.getElementById('openBtn');

        if (isAndroid) {
            btn.href = "${intentUri}";
            window.location.href = "${intentUri}";
        } else if (isIOS) {
            btn.href = "${customScheme}";
            window.location.href = "${customScheme}";
        } else {
            btn.href = "${customScheme}";
        }
    </script>
</body>
</html>`);
});

// Web fallback and deep link for reset password
app.get('/reset-password', (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).send('Invalid or missing reset token.');
    }

    // Android intent: must use scheme=https + host=thoughts.co.in to match app.json intentFilters
    const pageUrl = `https://thoughts.co.in/reset-password?token=${token}`;
    const intentUri = `intent://thoughts.co.in/reset-password?token=${token}#Intent;scheme=https;package=com.deepangokul.thoughts;S.browser_fallback_url=${encodeURIComponent(pageUrl)};end`;
    // iOS custom scheme
    const customScheme = `thoughts://reset-password?token=${token}`;

    res.send(`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Thoughts - Reset Password</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            background: linear-gradient(180deg, #1ce3d3 0%, #308fdb 100%); 
            display: flex; justify-content: center; align-items: center; min-height: 100vh; 
        }
        .card { 
            background: white; border-radius: 16px; padding: 40px 32px; 
            max-width: 400px; width: 90%; box-shadow: 0 8px 32px rgba(0,0,0,0.1); 
        }
        .title { font-size: 24px; font-weight: 800; color: #13151c; margin-bottom: 32px; text-align: center; }
        .form-group { margin-bottom: 20px; text-align: left; }
        .label { display: block; font-size: 14px; color: #6e7278; margin-bottom: 8px; font-weight: 500; }
        .input { 
            width: 100%; padding: 14px 16px; border-radius: 10px; border: 1px solid #e0e5eb; 
            font-size: 15px; outline: none; transition: border-color 0.2s; box-sizing: border-box;
        }
        .input:focus { border-color: #308fdb; }
        .btn { 
            display: block; width: 100%; background: #539cdc; color: white; 
            padding: 16px; border-radius: 10px; border: none; font-weight: 600; 
            font-size: 16px; cursor: pointer; margin-top: 12px; 
        }
        .btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .error { color: #d93025; font-size: 14px; text-align: center; margin-bottom: 20px; display: none; }
        .success { 
            background: #e6f4ea; color: #1e8e3e; padding: 16px; 
            border-radius: 8px; margin-bottom: 24px; font-weight: 500; text-align: center; display: none; 
        }
        .open-app-btn {
            display: none; width: 100%; background: #fff; color: #539cdc;
            padding: 14px; border-radius: 10px; border: 2px solid #539cdc; font-weight: 600;
            font-size: 16px; cursor: pointer; margin-top: 16px; text-align: center; text-decoration: none;
        }
        .divider {
            display: none; margin: 24px 0; text-align: center; position: relative;
        }
        .divider::before {
            content: ''; position: absolute; left: 0; top: 50%; width: 100%; height: 1px; background: #e0e5eb; z-index: 1;
        }
        .divider span {
            background: white; padding: 0 16px; color: #6e7278; font-size: 14px; position: relative; z-index: 2;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1 class="title">Reset Account Password</h1>
        
        <div id="successMsg" class="success">Password reset successfully! You can now log in.</div>
        <div id="errorMsg" class="error"></div>

        <form id="resetForm">
            <div class="form-group">
                <label class="label">Create New Password</label>
                <input type="password" id="newPassword" class="input" placeholder="Enter new password" required>
            </div>
            <div class="form-group">
                <label class="label">Confirm Password</label>
                <input type="password" id="confirmPassword" class="input" placeholder="Confirm password" required>
            </div>
            <button type="submit" id="submitBtn" class="btn">Update Password</button>
        </form>
    </div>

    <script>
        document.getElementById('resetForm').addEventListener('submit', function(e) {
            e.preventDefault();
            var newPassword = document.getElementById('newPassword').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            var errorMsg = document.getElementById('errorMsg');
            var submitBtn = document.getElementById('submitBtn');

            if (newPassword.length < 6) {
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'Password must be at least 6 characters.';
                return;
            }
            if (newPassword !== confirmPassword) {
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'Passwords do not match.';
                return;
            }

            errorMsg.style.display = 'none';
            submitBtn.disabled = true;
            submitBtn.textContent = 'Updating...';

            fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: "${token}", newPassword: newPassword })
            })
            .then(function(res) { return res.json().then(function(data) { return { ok: res.ok, data: data }; }); })
            .then(function(res) {
                if (res.ok) {
                    document.getElementById('resetForm').style.display = 'none';
                    document.getElementById('successMsg').style.display = 'block';
                } else {
                    errorMsg.style.display = 'block';
                    errorMsg.textContent = res.data.message || 'Failed to reset password.';
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Update Password';
                }
            })
            .catch(function(err) {
                errorMsg.style.display = 'block';
                errorMsg.textContent = 'Network error. Please try again.';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Update Password';
            });
        });
    </script>
</body>
</html>`);
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error handler middleware (must be last)
app.use(errorHandler);

// Start server (use 'server' instead of 'app' for Socket.IO)
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log('Socket.IO enabled for real-time notifications');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error(`Error: ${err.message}`);
    // process.exit(1); // Optional: prevents crash if DB connects slowly
});