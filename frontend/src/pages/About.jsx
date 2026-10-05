import './About.css';

const About = () => {
  return (
    <div className="about-page animate-fade-in">
      <div className="container section">
        <h1 className="text-center">About NCSPP</h1>
        <p className="text-center section-desc">Protecting the digital infrastructure of our nation.</p>
        
        <div className="grid grid-2 about-grid">
          <div className="about-text glass-card">
            <h2>Our Vision</h2>
            <p>
              To build a secure and resilient cyberspace for citizens, businesses, and government. We envision a digital landscape where innovation flourishes without the fear of cyber threats.
            </p>
            <h2 className="mt-4">Our Mission</h2>
            <p>
              The National Cyber Security Protection Portal coordinates national-level incident response, establishes cybersecurity policies, and provides actionable intelligence to prevent cybercrimes.
            </p>
          </div>
          
          <div className="about-image glass-card">
            <div className="placeholder-image">
              <span className="placeholder-text">Secure Network Hub</span>
              <div className="digital-lines"></div>
            </div>
          </div>
        </div>

        <h2 className="text-center section-title mt-5">Key Initiatives</h2>
        <div className="grid grid-3 text-center">
          <div className="glass-card initiative-card">
            <h3>Cyber Swachhta Kendra</h3>
            <p>Botnet Cleaning and Malware Analysis Centre providing free tools to citizens.</p>
          </div>
          <div className="glass-card initiative-card">
            <h3>National CIIP</h3>
            <p>Protection of Critical Information Infrastructure across sectors like power, banking, and defense.</p>
          </div>
          <div className="glass-card initiative-card">
            <h3>Cyber Surakshit</h3>
            <p>Awareness campaigns reaching millions of citizens regarding digital hygiene.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
