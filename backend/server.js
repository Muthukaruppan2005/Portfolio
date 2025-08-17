// backend/server.js - Serverless version for Vercel
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Define Contact schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

// Use existing model if already compiled to avoid OverwriteModelError
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

const app = express();

// MongoDB connection for serverless environment
const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 1, // Important for serverless
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // Disable mongoose buffering
    });
    console.log('MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// CORS config - update with your actual frontend URLs
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', // Vite dev server
    'https://your-portfolio-frontend.vercel.app', // Replace with your actual frontend URL
    'https://*.vercel.app' // Allow preview deployments
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Portfolio data
const portfolioData = {
  profile: {
    name: 'Muthukaruppan KN M',
    tagline: 'A passionate Computer Science and Engineering student.',
    about: [
      "Hi, I'm Muthukaruppan KN M 👋",
      "I'm a Computer Science and Engineering student passionate about building real-world solutions with technology. I enjoy working with web development, data visualization, and problem-solving. My goal is to create applications that are functional, user-friendly, and accessible. Outside academics, I like experimenting with creative ideas, exploring new technologies, and solving problems through logic and design."
    ],
    contact: {
      email: 'muthukaruppan2005@gmail.com',
      phone: '9655091925',
      linkedin: 'https://www.linkedin.com/in/muthukaruppan2005/',
      github: 'https://github.com/Muthukaruppan2005'
    }
  },
  projects: [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Developed my personal portfolio using React and deployed it on Vercel. Designed a responsive UI with a clean, modern layout for showcasing my work.',
      tech: ['React.js', 'HTML5', 'CSS3', 'Vercel'],
      image_url: 'https://placehold.co/600x400/292F38/FFFFFF/png?text=Portfolio+Website'
    },
    {
      id: 2,
      title: 'Alumini Connect',
      description: 'A web application designed to connect alumni with current students of the institution, enabling knowledge sharing, mentorship, and networking opportunities.',
      tech: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'GitHub', 'VS Code', 'Netlify/Render'],
      image_url: 'https://placehold.co/600x400/292F38/FFFFFF/png?text=Alumini+Connect+Platform'
    },
    {
      id: 3,
      title: 'Power BI Dashboards',
      description: 'Built interactive dashboards for business insights. Worked with sales, customer, and performance datasets. Used filters, KPIs, and drill-down visuals to improve decision-making.',
      tech: ['Power BI', 'DAX', 'Data Visualization'],
      image_url: 'https://placehold.co/600x400/292F38/FFFFFF/png?text=Power+BI+Dashboards'
    },
    {
      id: 4,
      title: 'VR Surgery Simulation (Academic Project)',
      description: 'Created a simulation model using VR concepts and 3D modeling. The project aimed to enhance medical training by providing an immersive, interactive experience.',
      tech: ['VR', 'Unity', 'Blender'],
      image_url: 'https://placehold.co/600x400/292F38/FFFFFF/png?text=VR+Surgery+Simulation'
    },
  ],
  skills: {
    languages: ['Java', 'C', 'JavaScript', 'SQL'],
    frontend: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
    backend: ['Node.js (basic)'],
    databases: ['MySQL', 'MongoDB'],
    data_viz: ['Power BI'],
    tools: ['Git & GitHub', 'VS Code', 'Postman', 'Netlify'],
    concepts: ['OOP', 'UI/UX Design', 'Cloud Computing']
  },
  certifications: [
    'Programming using Java - Infosys Springboard',
    'C Programming Hands-on - SkillRack',
    'Data Analytics Fundamentals - W3schools',
    'The Complete Full-Stack Web Development Bootcamp - Udemy(Current)'
  ],
  education: [
    {
      institution: 'Sri Ramakrishna Engineering College, Coimbatore',
      degree: 'B.E. Computer Science and Engineering',
      dates: '2022 – 2026 (Expected)',
      details: 'CGPA: 7.7 (till 6th sem)',
    },
    {
      institution: 'Venkatalakshmi Matriculation Higher Secondary School, Coimbatore',
      degree: 'Higher Secondary (Class XII)',
      dates: '2020 – 2022',
      percentage: 88.33,
    },
    {
      institution: 'Venkatalakshmi Matriculation Higher Secondary School, Coimbatore',
      degree: 'Secondary School (Class X)',
      dates: '2020',
      percentage: 80.4,
    }
  ],
  contactForm: {
    subtitle: "Feel free to reach out, I'll get back to you soon.",
    form: [
      { label: "Name", type: "text", name: "name", required: true, placeholder: "Your Name" },
      { label: "Email", type: "email", name: "email", required: true, placeholder: "your.email@example.com" },
      { label: "Phone Number", type: "tel", name: "phoneNumber", required: false, placeholder: "(+91) 987-654-3210" },
      { label: "Message", type: "textarea", name: "message", required: true, placeholder: "Tell me about your project..." }
    ]
  }
};

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Portfolio endpoint
app.get('/api/portfolio', async (req, res) => {
  try {
    console.log('Portfolio data requested');
    res.json(portfolioData);
  } catch (error) {
    console.error('Portfolio API error:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    await connectToDatabase();

    const { name, email, phoneNumber, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const newContact = new Contact({ 
      name: name.trim(), 
      email: email.trim().toLowerCase(), 
      phoneNumber: phoneNumber ? phoneNumber.trim() : undefined, 
      message: message.trim() 
    });

    await newContact.save();

    console.log('New contact saved:', { name, email });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Please check your input and try again.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
});

// Handle preflight requests
app.options('*', cors(corsOptions));

// 404 handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API route not found',
    path: req.path,
    method: req.method 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 5000;

// Only start server in development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Portfolio API: http://localhost:${PORT}/api/portfolio`);
    console.log(`💬 Contact API: http://localhost:${PORT}/api/contact`);
    console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
  });
}

// Export for Vercel
module.exports = app;