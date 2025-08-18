const mongoose = require('mongoose');

// Connect to MongoDB once per serverless function instance to reuse the connection
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      // useUnifiedTopology is deprecated and can be removed
    });
    isConnected = true;
    console.log('MongoDB connected successfully for serverless function.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Define the Contact schema and model (avoid model overwrite errors)
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  phoneNumber: { type: String },
  date: { type: Date, default: Date.now },
});
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

// Provide full portfolio data
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
      image_url: 'https://placehold.co/600x400/292F38/FFFFFF/png?text=Portfolio+Website',
    },
    {
      id: 2,
      title: 'Alumini Connect',
      description: 'A web application designed to connect alumni with current students of the institution, enabling knowledge sharing, mentorship, and networking opportunities.',
      tech: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'GitHub', 'VS Code', 'Netlify/Render'],
      image_url: 'https://placehold.co/600x400/292F38/FFFFFF/png?text=Alumini+Connect+Platform',
    },
    {
      id: 3,
      title: 'Power BI Dashboards',
      description: 'Built interactive dashboards for business insights. Worked with sales, customer, and performance datasets. Used filters, KPIs, and drill-down visuals to improve decision-making.',
      tech: ['Power BI', 'DAX', 'Data Visualization'],
      image_url: 'https://placehold.co/600x400/292F38/FFFFFF/png?text=Power+BI+Dashboards',
    },
    {
      id: 4,
      title: 'VR Surgery Simulation (Academic Project)',
      description: 'Created a simulation model using VR concepts and 3D modeling. The project aimed to enhance medical training by providing an immersive, interactive experience.',
      tech: ['VR', 'Unity', 'Blender'],
      image_url: 'https://placehold.co/600x400/292F38/FFFFFF/png?text=VR+Surgery+Simulation',
    },
  ],
  skills: {
    languages: ['Java', 'C', 'JavaScript', 'SQL'],
    frontend: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
    backend: ['Node.js (basic)'],
    databases: ['MySQL', 'MongoDB'],
    data_viz: ['Power BI'],
    tools: ['Git & GitHub', 'VS Code', 'Postman', 'Netlify'],
    concepts: ['OOP', 'UI/UX Design', 'Cloud Computing'],
  },
  certifications: [
    'Programming using Java - Infosys Springboard',
    'C Programming Hands-on - SkillRack',
    'Data Analytics Fundamentals - W3schools',
    'The Complete Full-Stack Web Development Bootcamp - Udemy(Current)',
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
    },
  ],
  contactForm: {
    subtitle: "Feel free to reach out, I'll get back to you soon.",
    form: [
      { label: 'Name', type: 'text', name: 'name', required: true, placeholder: 'Your Name' },
      { label: 'Email', type: 'email', name: 'email', required: true, placeholder: 'your.email@example.com' },
      { label: 'Phone Number', type: 'tel', name: 'phoneNumber', required: false, placeholder: '(+91) 987-654-3210' },
      { label: 'Message', type: 'textarea', name: 'message', required: true, placeholder: 'Tell me about your project...' },
    ],
  },
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    res.status(200).json(portfolioData);
  } else if (req.method === 'POST') {
    try {
      const { name, email, phoneNumber, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
      }

      const newContact = new Contact({ name, email, phoneNumber, message });
      await newContact.save();

      res.status(201).json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
      console.error('Contact form error:', err);
      res.status(500).json({ success: false, message: 'Failed to send message.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
