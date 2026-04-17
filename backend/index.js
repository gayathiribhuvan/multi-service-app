const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Health check (used by Kubernetes + monitoring)
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Task data (used by frontend UI)
app.get('/api/tasks', (req, res) => {
    const tasks = [
        { id: 1, task: "Setup Jenkins Pipeline", status: "Done" },
        { id: 2, task: "Integrate SonarQube", status: "In Progress" },
        { id: 3, task: "Dockerize Application", status: "Pending" },
        { id: 4, task: "Deploy using Kubernetes", status: "Pending" }
    ];

    res.status(200).json(tasks);
});

// Port config
const PORT = process.env.PORT || 3000;

// Start server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export for testing
module.exports = app;
