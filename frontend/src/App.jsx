import { useState, useEffect, useRef } from 'react';
import './App.css';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import powerBiImage from './assets/powerbi.png';
import aluminiImage from './assets/alumini.png';
import vrImage from './assets/vr.png';
import portfolioImage from './assets/portfolio.png';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    // Replace 'your-backend-app-name' with your actual Render app name
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-backend-app-name.onrender.com' 
      : 'http://localhost:5000';

    fetch(`${apiUrl}/api/portfolio`)
      .then(response => response.json())
      .then(result => {
        setData(result);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching portfolio data:', error);
        setIsLoading(false);
      });
  }, []);

  const projectImages = {
    'Alumini Connect': aluminiImage,
    'Power BI Dashboards': powerBiImage,
    'Portfolio Website': portfolioImage,
    'VR Surgery Simulation (Academic Project)': vrImage,
  };

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    
    // Replace 'your-backend-app-name' with your actual Render app name
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-backend-app-name.onrender.com' 
      : 'http://localhost:5000';

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', phoneNumber: '', message: '' });
      } else {
        setFormStatus(result.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setFormStatus('Failed to send message. Please try again.');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (!data) {
    return <div className="error">Failed to load portfolio data. Please check your backend server.</div>;
  }

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <span className="logo" onClick={() => scrollToSection(homeRef)}>MK</span>
        <div className="nav-links">
          <a onClick={() => scrollToSection(homeRef)}>Home</a>
          <a onClick={() => scrollToSection(aboutRef)}>About</a>
          <a onClick={() => scrollToSection(projectsRef)}>Projects</a>
          <a onClick={() => scrollToSection(skillsRef)}>Skills</a>
          <a onClick={() => scrollToSection(educationRef)}>Education</a>
          <a onClick={() => scrollToSection(contactRef)}>Contact</a>
        </div>
      </nav>

      <section ref={homeRef} className="hero-section">
        <h2 className="hero-welcome">Welcome to my portfolio</h2>
        <h1 className="hero-greeting">Hi, I'm Muthukaruppan KN M 👋</h1>
        <p className="hero-tagline">{data.profile.tagline}</p>
        <a href="/Muthukaruppan_Resume.pdf" download="Muthukaruppan_Resume.pdf" className="resume-button">
          Download Resume
        </a>
      </section>

      <section ref={aboutRef} className="about-me-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-me-text-container">
          {data.profile.about.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section ref={projectsRef} className="projects-section">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {data.projects.map(project => (
            <div key={project.id} className="project-card">
              <img src={projectImages[project.title] || project.image_url} alt={`${project.title} screenshot`} className="project-image" />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">
                {project.tech.map(tag => (
                  <span key={tag} className="tech-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={skillsRef} className="skills-section">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {Object.keys(data.skills).map(category => (
            <div key={category} className="skill-category">
              <h4>{category.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase())}</h4>
              <div className="skill-tags">
                {data.skills[category].map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={educationRef} className="education-section">
        <h2 className="section-title">Education</h2>
        <div className="timeline-container">
          {data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.degree}</h3>
              <p>{edu.institution} ({edu.dates})</p>
              {edu.details && <p>{edu.details}</p>}
              {edu.percentage && <p>Percentage: {edu.percentage}%</p>}
            </div>
          ))}
        </div>
      </section>

      <section ref={contactRef} className="contact-section">
        <h2 className="section-title">Get in Touch</h2>
        <p className="contact-subtitle">{data.contactForm.subtitle}</p>
        <form onSubmit={handleFormSubmit} className="contact-form">
          {data.contactForm.form.map(field => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleFormChange}
                  required={field.required}
                  placeholder={field.placeholder}
                ></textarea>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleFormChange}
                  required={field.required}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
          <button type="submit" className="submit-button">Send Message</button>
        </form>
        {formStatus && <p className="form-status">{formStatus}</p>}
      </section>

      <footer className="footer-section">
        <p className="footer-link-text">Connect with me:</p>
        <div className="social-links-grid">
          <FooterLink href={data.profile.contact.linkedin} icon={FaLinkedin} />
          <FooterLink href={data.profile.contact.github} icon={FaGithub} />
          <FooterLink href={`mailto:${data.profile.contact.email}`} icon={FaEnvelope} />
          <FooterLink href={`tel:${data.profile.contact.phone}`} icon={FaPhone} />
        </div>
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Muthukaruppan KN M. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

// Helper component for footer links to keep the code clean
function FooterLink({ href, icon: Icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link">
      <Icon className="footer-icon" />
    </a>
  );
}