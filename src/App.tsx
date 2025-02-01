import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, BookOpen, Code2, Brain, Award, Phone, MapPin, Languages, AlignCenterVertical as Certificate, Rocket, Target, Users, Zap } from 'lucide-react';

function useInView(ref: React.RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isInView;
}

function App() {
  const statsRef = React.useRef<HTMLDivElement>(null);
  const skillsRef = React.useRef<HTMLDivElement>(null);
  const projectsRef = React.useRef<HTMLDivElement>(null);
  const experienceRef = React.useRef<HTMLDivElement>(null);

  const statsInView = useInView(statsRef);
  const skillsInView = useInView(skillsRef);
  const projectsInView = useInView(projectsRef);
  const experienceInView = useInView(experienceRef);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
        <div className="container mx-auto px-4 sm:px-6 py-20 sm:py-32 relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2 text-center md:text-left animate-fadeIn">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-4 animate-bounce">
                  👋 Welcome to my portfolio
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 animate-slideInLeft">
                  Muthukaruppan
                </h1>
                <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl animate-slideInRight delay-200">
                  Aspiring Computer Science Engineer with a passion for innovation. Specializing in data analytics, VR development, and creative problem-solving.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <ContactInfo icon={<Mail className="w-5 h-5" />} text="Muthukaruppan2005@gmail.com" delay={300} />
                  <ContactInfo icon={<Phone className="w-5 h-5" />} text="+91 9655091925" delay={400} />
                  <ContactInfo icon={<MapPin className="w-5 h-5" />} text="Coimbatore, Tamilnadu" delay={500} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl relative animate-scaleUp">
                  <img 
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 ${statsInView ? 'animate-scaleUp' : 'opacity-0'}`}>
            <StatCard icon={<Target />} number="2+" label="Years of Learning" />
            <StatCard icon={<Code2 />} number="10+" label="Projects Completed" />
            <StatCard icon={<Users />} number="50+" label="Collaborations" />
            <StatCard icon={<Rocket />} number="100%" label="Commitment" />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Skills & Languages" subtitle="What I Bring to the Table" />
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 ${skillsInView ? 'animate-fadeIn' : 'opacity-0'}`}>
            <SkillCard 
              icon={<Code2 className="w-8 h-8 animate-rotate" />}
              title="Technical Skills"
              skills={[
                { name: 'C Programming' },
                { name: 'HTML, CSS & Javascript' },
                { name: 'Data Structures & Algorithms' },
                { name: 'SQL Programming' }
              ]}
            />
            <SkillCard 
              icon={<Brain className="w-8 h-8 animate-bounce" />}
              title="Soft Skills"
              skills={[
                { name: 'Problem Solving' },
                { name: 'Creative Thinking' },
                { name: 'Team Management' },
                { name: 'Communication' }
              ]}
            />
            <SkillCard 
              icon={<Languages className="w-8 h-8 animate-pulse" />}
              title="Languages"
              skills={[
                { name: 'English' },
                { name: 'Tamil' },
                { name: 'Hindi' }
              ]}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Featured Projects" subtitle="Recent Work" />
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 ${projectsInView ? 'animate-slideInRight' : 'opacity-0'}`}>
            <ProjectCard 
              title="A Virtual Revolution in Surgical Training"
              description="College Mini Project (1 year) focused on developing a VR surgical simulation system using Unity and Blender. Created immersive 3D anatomical models and implemented interactive modules for procedural guidance."
              tags={['Unity', 'VR', 'Blender', '3D Modeling']}
              image="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600"
            />
            <ProjectCard 
              title="Power BI Analytics Suite"
              description="Intern project (6 weeks) developing comprehensive dashboards for E-commerce and Amazon Prime Video. Analyzed sales, customer behavior, and content performance metrics using interactive visualizations."
              tags={['Power BI', 'Data Analytics', 'Visualization']}
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} id="experience" className="py-16 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeader title="Experience" subtitle="Professional Journey" />
          <div className={`max-w-3xl mx-auto ${experienceInView ? 'animate-slideInLeft' : 'opacity-0'}`}>
            <div className="bg-white rounded-lg p-6 sm:p-8 shadow-lg transform hover:scale-[1.02] transition-transform">
              <div className="flex items-start">
                <Award className="w-12 h-12 text-blue-600 mr-4 flex-shrink-0 animate-bounce" />
                <div>
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl font-semibold">Data Analytics Intern</h3>
                    <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm animate-pulse">Current</span>
                  </div>
                  <p className="text-gray-600">Emergere Computing Solutions Pvt. Ltd.</p>
                  <p className="text-gray-500 mb-4">June 2024 – July 2024</p>
                  <div className="space-y-4">
                    <ExperienceItem 
                      title="Data Processing & Analysis"
                      description="Gained hands-on experience in data acquisition, modeling, ETL processes, and data visualization."
                    />
                    <ExperienceItem 
                      title="Analytical Problem Solving"
                      description="Demonstrated strong analytical skills by applying theoretical knowledge to practical scenarios."
                    />
                    <ExperienceItem 
                      title="Data Visualization"
                      description="Worked on visualizing complex datasets, enhancing decision-making processes through clear communication."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
        <div className="container mx-auto px-4 sm:px-6 relative">
          <SectionHeader 
            title="Get In Touch" 
            subtitle="Let's Connect"
            light={true}
          />
          <div className="flex justify-center space-x-8">
            <SocialLink icon={<Mail className="animate-bounce" />} href="mailto:Muthukaruppan2005@gmail.com" label="Email" />
            <SocialLink icon={<Linkedin className="animate-pulse" />} href="https://www.linkedin.com/in/muthukaruppan2005" label="LinkedIn" />
            <SocialLink icon={<Github className="animate-rotate" />} href="https://github.com/Muthukaruppan2005" label="GitHub" />
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ title, subtitle, light = false }) {
  return (
    <div className="text-center mb-16">
      <h4 className={`text-sm font-semibold uppercase tracking-wider ${light ? 'text-blue-200' : 'text-blue-600'} mb-2`}>
        {subtitle}
      </h4>
      <h2 className={`text-3xl md:text-4xl font-bold ${light ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
    </div>
  );
}

function StatCard({ icon, number, label }) {
  return (
    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md">
      <div className="inline-block p-3 bg-blue-100 rounded-lg text-blue-600 mb-4">
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{number}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

function ContactInfo({ icon, text, delay }) {
  return (
    <div className={`flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors animate-fadeIn`} style={{ animationDelay: `${delay}ms` }}>
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
}

function SkillCard({ icon, title, skills }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg transform hover:scale-[1.02] transition-transform">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-6">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span className="text-gray-700">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ title, description, tags, image }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperienceItem({ title, description }) {
  return (
    <div className="border-l-2 border-blue-200 pl-4">
      <h4 className="text-lg font-medium text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function SocialLink({ icon, href, label }) {
  return (
    <a 
      href={href}
      className="flex flex-col items-center hover:text-blue-200 transition-colors group"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="p-3 bg-white/10 rounded-full mb-2 group-hover:bg-white/20 transition-colors">
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </a>
  );
}

export default App;