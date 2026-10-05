import { Link } from 'react-router-dom';
import { FiShield, FiAlertTriangle, FiEye, FiLock, FiActivity, FiCpu } from 'react-icons/fi';
import { useLanguage } from '../contexts/LanguageContext';
import './Home.css';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="home animate-fade-in">
      {/* Dynamic 3D Hero Section */}
      <section className="hero">
        <div className="hero-overlay-3d"></div>
        <div className="cyber-particles">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        
        <div className="container hero-content perspective-container">
          <div className="floating-element badge-3d">
            <div className="badge">{t('hero.badge')}</div>
          </div>
          
          <h1 className="hero-title text-glow-3d">{t('hero.title')}</h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          
          <div className="hero-actions floating-element-delay">
            <Link to="/report" className="btn btn-primary btn-lg pulse-btn shadow-3d">{t('hero.report_btn')}</Link>
            <Link to="/awareness" className="btn btn-outline btn-lg shadow-3d">{t('hero.stay_safe_btn')}</Link>
          </div>
        </div>

        {/* 3D Radar Graphic */}
        <div className="hero-graphic graphic-container-3d">
          <div className="radar-3d">
            <div className="radar-ring r1"></div>
            <div className="radar-ring r2"></div>
            <div className="radar-ring r3"></div>
            <div className="radar-sweep-3d"></div>
            <div className="target-blip t1"></div>
            <div className="target-blip t2"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section mission-section">
        <div className="container">
          <div className="grid grid-2 align-center">
            
            <div className="mission-content slide-in-left">
              <h2 className="glow-text">Our Mission</h2>
              <p>
                The National Cyber Security Protection Portal serves as the central hub for identifying, analyzing, and mitigating cyber threats. We work tirelessly to ensure the resilience of critical information infrastructure and provide a secure cyberspace for our nation.
              </p>
              <ul className="mission-list">
                <li><FiLock className="icon-blue" /> Securing National Digital Assets</li>
                <li><FiAlertTriangle className="icon-red" /> Rapid Threat Intelligence</li>
                <li><FiShield className="icon-green" /> Citizen Data Protection</li>
              </ul>
            </div>

            {/* 3D Floating Stats Cards */}
            <div className="mission-stats perspective-container slide-in-right">
              <div className="stat-box-3d glass-card card-hover-3d float-anim-1">
                <FiActivity className="stat-icon" />
                <h3>99.9%</h3>
                <p>Uptime Security</p>
              </div>
              <div className="stat-box-3d glass-card card-hover-3d float-anim-2">
                <FiCpu className="stat-icon" />
                <h3>24/7</h3>
                <p>Threat Monitoring</p>
              </div>
              <div className="stat-box-3d glass-card card-hover-3d float-anim-3">
                <FiShield className="stat-icon text-green" />
                <h3>10k+</h3>
                <p>Incidents Resolved</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features-section">
        <div className="container text-center perspective-container">
          <h2 className="glow-text">Core Capabilities</h2>
          <p className="section-desc">Advanced systems engineered for maximum protection.</p>
          
          <div className="grid grid-3 features-grid">
            <div className="feature-card glass-card card-hover-3d pop-up-1">
              <div className="icon-wrapper">
                <FiEye className="feature-icon" />
              </div>
              <h3>Real-Time Monitoring</h3>
              <p>Continuous surveillance of national networks to detect anomalies and neutralize threats instantly.</p>
            </div>
            
            <div className="feature-card glass-card card-hover-3d pop-up-2">
              <div className="icon-wrapper">
                <FiShield className="feature-icon text-green" />
              </div>
              <h3>Incident Response</h3>
              <p>Dedicated rapid response teams to handle national-level cyber emergencies efficiently.</p>
            </div>
            
            <div className="feature-card glass-card card-hover-3d pop-up-3">
              <div className="icon-wrapper">
                <FiAlertTriangle className="feature-icon text-red" />
              </div>
              <h3>Threat Reporting</h3>
              <p>Secure anonymous portal for citizens to report suspicious online activities and financial fraud.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section perspective-container">
        <div className="container">
          <div className="cta-box glass-card text-center card-hover-3d float-anim-1">
            <div className="cta-glow-bg"></div>
            <h2 className="glow-text">Have you been a victim of a cyber crime?</h2>
            <p>Don't hesitate. Report it immediately to our national response center.</p>
            <Link to="/report" className="btn btn-danger btn-lg cta-btn pulse-btn shadow-3d mt-4">File a Report Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
