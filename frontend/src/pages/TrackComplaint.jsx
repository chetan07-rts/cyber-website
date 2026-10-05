import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './TrackComplaint.css';
import { FiRefreshCw, FiSearch, FiShield, FiCheckCircle } from 'react-icons/fi';

const TrackComplaint = () => {
  const { t } = useLanguage();
  
  // Track form state for our mockup
  const [ackNo, setAckNo] = useState('');
  const [otp, setOtp] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleGetOtp = () => {
    if (!ackNo) {
      alert("Please enter your Acknowledgement No.");
      return;
    }
    // Mock sending OTP
    setOtpSent(true);
    alert("An OTP has been sent to your registered mobile number.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) return;
    
    if (!otp || !captcha) {
      alert("Please fill in OTP and Captcha");
      return;
    }
    
    alert(`Status for Acknowledgement No. ${ackNo}: Currently under investigation.`);
  };

  const generateCaptcha = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const [captchaText, setCaptchaText] = useState(generateCaptcha());

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
  };

  return (
    <div className="track-page animate-fade-in">
      
      {/* Premium Hero Section */}
      <section className="track-hero">
        <div className="track-hero-bg"></div>
        <div className="container track-hero-content">
          <h1 className="gradient-text">{t('track.title') || "Track your Complaint Status"}</h1>
          <p className="track-hero-subtitle">
            Monitor the real-time progress of your reported cybercrimes. Our dedicated cyber defense team updates the investigation status securely.
          </p>
        </div>
      </section>

      <section className="container section track-main-section">
        
        {/* Tracking Steps Info Panel */}
        <div className="track-info-panel glass-card">
          <h3 className="info-title">How Tracking Works</h3>
          <div className="tracking-steps">
            <div className="track-step">
              <div className="step-icon"><FiSearch /></div>
              <div className="step-text">
                <h4>1. Verification</h4>
                <p>Provide your Acknowledgement No. and verify your identity via OTP.</p>
              </div>
            </div>
            <div className="track-step">
              <div className="step-icon"><FiShield /></div>
              <div className="step-text">
                <h4>2. Investigation</h4>
                <p>View real-time updates as our cyber forensic analysts investigate the case.</p>
              </div>
            </div>
            <div className="track-step">
              <div className="step-icon"><FiCheckCircle /></div>
              <div className="step-text">
                <h4>3. Resolution</h4>
                <p>Receive final reports and actions taken by law enforcement agencies.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Form */}
        <div className="track-form-container glass-card premium-border">
          <h2 className="track-form-header">Secure Status Portal</h2>
          
          <form onSubmit={handleSubmit} className="track-form">
            <div className="form-row">
              <label className="form-label">
                {t('track.ack_no') || "Acknowledgement No."} <span className="text-red">*</span>:
              </label>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control premium-input" 
                  placeholder={t('track.enter_ack') || "Enter Acknowledgement No. here..."}
                  value={ackNo}
                  onChange={(e) => setAckNo(e.target.value)}
                  required
                />
                <button 
                  type="button" 
                  className="btn btn-warning otp-btn"
                  onClick={handleGetOtp}
                >
                  {t('track.get_otp') || "Get OTP"}
                </button>
              </div>
            </div>

            <div className="form-row">
              <label className="form-label empty-label"></label>
              <div className="input-group">
                <input 
                  type="text" 
                  className={`form-control premium-input ${!otpSent ? 'disabled-input' : ''}`}
                  placeholder={t('track.enter_otp') || "Enter OTP here..."}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={!otpSent}
                  required={otpSent}
                />
              </div>
            </div>

            <div className="form-row">
               <div className="captcha-wrapper">
                  <div className="captcha-display">
                    <canvas id="captchaCanvas" className="captcha-img" />
                    <span className="captcha-text-overlay">{captchaText}</span>
                  </div>
                  <button type="button" className="icon-btn captcha-refresh" onClick={refreshCaptcha}>
                    <FiRefreshCw />
                  </button>
               </div>
               
               <div className="input-group">
                <input 
                  type="text" 
                  className="form-control premium-input" 
                  placeholder={t('track.enter_captcha') || "Enter Captcha"}
                  value={captcha}
                  onChange={(e) => setCaptcha(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-success submit-btn glow-btn">
                  {t('track.submit') || "Submit"}
                </button>
               </div>
            </div>
          </form>
        </div>

      </section>
    </div>
  );
};

export default TrackComplaint;
