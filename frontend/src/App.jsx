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
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  // Helper function to get the correct API URL
  const getApiUrl = () => {
    // For development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5000';
    }
    // For production - use the same domain as the frontend
    return window.location.origin;
  };

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const apiUrl = getApiUrl();
        console.log('Fetching from:', `${apiUrl}/api/portfolio`);
        
        const response = await fetch(`${apiUrl}/api/portfolio`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
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
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Sending...');
    
    try {
      const apiUrl = getApiUrl();
      console.log('Sending contact form to:', `${apiUrl}/api/contact`);
      
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setFormStatus('✅ Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', phoneNumber: '', message: '' });
      } else {
        setFormStatus(`❌ ${result.message || 'Failed to send message.'}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('❌ Failed to send message. Please try again or contact me directly.');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  // Error state
  if (error || !data) {
    return (
      <div className="error">
        <h2>Oops! Something went wrong</h2>
        <p>Failed to load portfolio data: {error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Try Again
        </button>
        <p>Or contact me directly at: muthukaruppan2005@gmail.com</p>
      </div>
    );
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
        <h1 className="hero-greeting">Hi, I'm Muthukaruppan 👋</h1>
        <p className="hero-tagline">{data.profile.tagline}</p>
        <a href="/Muthukaruppan_Resume.pdf" download="Muthukaruppan_Resume.pdf" className="resume-button">
          Get My Resume
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
              <img 
                src={projectImages[project.title] || project.image_url} 
                alt={`${project.title} screenshot`} 
                className="project-image"
                onError={(e) => {
                  e.target.src = project.image_url; // Fallback to placeholder
                }}
              />
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
                  rows="5"
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
          <button type="submit" className="submit-button" disabled={formStatus === 'Sending...'}>
            {formStatus === 'Sending...' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {formStatus && (
          <div className={`form-status ${formStatus.includes('✅') ? 'success' : 'error'}`}>
            {formStatus}
          </div>
        )}
      </section>

      <footer className="footer-section">
        <p className="footer-link-text">Connect with me:</p>
        <div className="social-links-grid">
          <FooterLink href={data.profile.contact.linkedin} icon={FaLinkedin} />
          <FooterLink href={data.profile.contact.github} icon={FaGithub} />
          <FooterLink href={`mailto:${data.profile.contact.email}`} icon={FaEnvelope} />
          <FooterLink href={`tel:${data.profile.contact.phone}`} icon={FaPhone} />
        </div>
        <p className="footer-copyright">&copy; {new Date().getFullYear()} Muthukaruppan. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Helper component for footer links to keep the code clean
function FooterLink({ href, icon: Icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="footer-link">
      <Icon className="footer-icon" />
    </a>
  );
}

export default App;