const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - Allow your Vercel frontend
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', // Vite dev server
    'https://your-vercel-app-name.vercel.app', // Replace with your actual Vercel URL
    process.env.FRONTEND_URL // You can set this in Render environment variables
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Portfolio data endpoint
app.get('/api/portfolio', (req, res) => {
  const portfolioData = {
    profile: {
      tagline: "Full Stack Developer | Data Analytics Enthusiast | Problem Solver",
      about: [
        "I am a passionate Full Stack Developer with expertise in modern web technologies and data analytics. With a strong foundation in both frontend and backend development, I enjoy creating efficient, scalable, and user-friendly applications.",
        "My journey in technology has led me to work with various frameworks and tools, always staying curious and eager to learn new technologies. I believe in writing clean, maintainable code and following best practices.",
        "Beyond coding, I'm interested in data visualization, business intelligence, and emerging technologies like VR/AR. I'm always looking for opportunities to apply technology to solve real-world problems."
      ],
      contact: {
        linkedin: "https://linkedin.com/in/your-profile",
        github: "https://github.com/your-username",
        email: "your.email@example.com",
        phone: "+91-9876543210"
      }
    },
    projects: [
      {
        id: 1,
        title: "Alumini Connect",
        description: "A comprehensive platform connecting alumni with current students, featuring networking capabilities, mentorship programs, and career guidance systems.",
        tech: ["React", "Node.js", "MongoDB", "Express"],
        image_url: ""
      },
      {
        id: 2,
        title: "Power BI Dashboards",
        description: "Interactive business intelligence dashboards providing insights into sales performance, customer analytics, and operational metrics.",
        tech: ["Power BI", "SQL", "DAX", "Excel"],
        image_url: ""
      },
      {
        id: 3,
        title: "Portfolio Website",
        description: "A responsive personal portfolio website showcasing projects, skills, and professional experience with modern web technologies.",
        tech: ["React", "CSS3", "JavaScript", "Vercel"],
        image_url: ""
      },
      {
        id: 4,
        title: "VR Surgery Simulation (Academic Project)",
        description: "An immersive virtual reality application for medical training, providing realistic surgery simulation for educational purposes.",
        tech: ["Unity", "C#", "VR", "3D Modeling"],
        image_url: ""
      }
    ],
    skills: {
      programming_languages: ["JavaScript", "Python", "Java", "C#", "SQL"],
      frontend_technologies: ["React", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
      backend_technologies: ["Node.js", "Express.js", "MongoDB", "MySQL", "REST APIs"],
      tools_and_platforms: ["Git", "Docker", "Vercel", "Power BI", "Unity", "VS Code"]
    },
    education: [
      {
        degree: "Bachelor of Engineering in Computer Science",
        institution: "Your University Name",
        dates: "2020-2024",
        details: "Specialized in Software Engineering and Data Analytics",
        percentage: "85"
      },
      {
        degree: "Higher Secondary Certificate",
        institution: "Your School Name",
        dates: "2018-2020",
        details: "Science Stream with Computer Science",
        percentage: "90"
      }
    ],
    contactForm: {
      subtitle: "I'd love to hear from you! Whether you have a project in mind, want to collaborate, or just want to say hello.",
      form: [
        {
          name: "name",
          label: "Name",
          type: "text",
          required: true,
          placeholder: "Your Name"
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
          placeholder: "your.email@example.com"
        },
        {
          name: "phoneNumber",
          label: "Phone Number",
          type: "tel",
          required: false,
          placeholder: "+91-9876543210"
        },
        {
          name: "message",
          label: "Message",
          type: "textarea",
          required: true,
          placeholder: "Your message here..."
        }
      ]
    }
  };

  res.json(portfolioData);
});

// Contact form endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, phoneNumber, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  // Here you can add your email sending logic
  // For now, just log the contact form data
  console.log('New contact form submission:', {
    name,
    email,
    phoneNumber,
    message,
    timestamp: new Date().toISOString()
  });

  // Simulate successful email sending
  res.status(200).json({ 
    message: 'Message received successfully! Thank you for reaching out.',
    success: true 
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio Backend API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});