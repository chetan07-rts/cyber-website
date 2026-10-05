import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguage } from '../contexts/LanguageContext';
import './Awareness.css';

const Awareness = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/posts');
        if (data && data.length > 0) {
          setPosts(data);
        }
      } catch (error) {
        console.error('Error fetching awareness posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="awareness-page animate-fade-in">
      {/* Header Section */}
      <div className="awareness-header text-center section">
        <div className="container">
          <h1 className="elegant-title">{t('awareness.title') || "Cyber Awareness Hub"}</h1>
          <p className="elegant-subtitle">
            {t('awareness.subtitle') || "Knowledge is your first line of defense. Learn how modern adversaries operate and stay one step ahead."}
          </p>
        </div>
      </div>

      {/* Modern Scam Exhibition Section */}
      <div className="container section scam-exhibition">
        <h2 className="section-title text-center mb-5">{t('awareness.common_threats') || "Anatomy of Common Threats"}</h2>
        
        <div className="scam-showcase">
          {/* Scam 1: Phishing */}
          <div className="scam-row">
            <div className="scam-visual glass-card">
              <img src="/scams/phishing.png" alt="Phishing Illustration" className="scam-img" />
              <div className="visual-overlay"></div>
            </div>
            <div className="scam-info">
              <h3>{t('awareness.phishing_title') || "Phishing & Smishing"}</h3>
              <p className="scam-desc">
                {t('awareness.phishing_desc') || "Cybercriminals cast a wide net using deceptive emails (Phishing) or SMS texts (Smishing) that mimic trusted entities like your bank, government portals, or delivery services. They create a false sense of urgency, tricking you into clicking malicious links that steal your credentials or install malware."}
              </p>
              <div className="defense-box">
                <h4><span className="icon-shield">🛡️</span> {t('awareness.how_to_defend') || "How to Defend"}</h4>
                <ul>
                  <li>{t('awareness.phish_tip1') || "Never click links in unexpected messages."}</li>
                  <li>{t('awareness.phish_tip2') || "Verify the sender's actual email address, not just the display name."}</li>
                  <li>{t('awareness.phish_tip3') || "Navigate to websites manually instead of using provided links."}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scam 2: Vishing */}
          <div className="scam-row reverse">
            <div className="scam-visual glass-card">
              <img src="/scams/vishing.png" alt="Vishing Illustration" className="scam-img" />
              <div className="visual-overlay"></div>
            </div>
            <div className="scam-info">
              <h3>{t('awareness.vishing_title') || "Vishing (Voice Phishing)"}</h3>
              <p className="scam-desc">
                {t('awareness.vishing_desc') || "Attackers call you over the phone, often spoofing the caller ID to look like law enforcement or your financial institution. Using psychological manipulation and fear, they convince you that your account is compromised and demand that you verify your identity by sharing OTPs or transferring funds to a 'safe' account."}
              </p>
              <div className="defense-box">
                <h4><span className="icon-shield">🛡️</span> {t('awareness.how_to_defend') || "How to Defend"}</h4>
                <ul>
                  <li>{t('awareness.vish_tip1') || "Banks and Government officials will never ask for your PIN, Password, or OTP."}</li>
                  <li>{t('awareness.vish_tip2') || "If pressured, hang up and call the official number on the back of your card."}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scam 3: Social Engineering */}
          <div className="scam-row">
            <div className="scam-visual glass-card">
              <img src="/scams/social.png" alt="Social Engineering" className="scam-img" />
              <div className="visual-overlay"></div>
            </div>
            <div className="scam-info">
              <h3>{t('awareness.social_title') || "Social Engineering & Fraud"}</h3>
              <p className="scam-desc">
                {t('awareness.social_desc') || "The 'Wolf in Sheep's Clothing'. Attackers gather your personal info from social media to build trust. They may pose as a friend in distress needing emergency funds, or offer fake tech support. The attack targets human psychology rather than technical vulnerabilities."}
              </p>
              <div className="defense-box">
                <h4><span className="icon-shield">🛡️</span> {t('awareness.how_to_defend') || "How to Defend"}</h4>
                <ul>
                  <li>{t('awareness.social_tip1') || "Set your social media profiles to private."}</li>
                  <li>{t('awareness.social_tip2') || "Be skeptical of unsolicited offers that sound too good to be true."}</li>
                  <li>{t('awareness.social_tip3') || "Always verify the identity of anyone asking for money, even friends."}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Alerts Section */}
      <div className="container section live-alerts">
        <h2 className="section-title text-center mb-5">{t('awareness.live_alerts') || "Live Threat Intelligence"}</h2>
        
        {loading ? (
          <div className="loader-container">
            <div className="radar-loader"></div>
            <p>Scanning intelligence feeds...</p>
          </div>
        ) : (
          <div className="grid grid-3 awareness-grid">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="awareness-card glass-card">
                  <div className="card-badge">{post.category || 'Alert'}</div>
                  <h3>{post.title}</h3>
                  <p className="post-content">{post.content}</p>
                  <div className="post-footer">
                    <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              // Fallback cards if DB is empty
              <>
                <div className="awareness-card glass-card">
                  <div className="card-badge">Alert</div>
                  <h3>New Fake WhatsApp Updates</h3>
                  <p className="post-content">Fraudsters are sending APK files claiming to be 'WhatsApp Pink' or premium updates. Installing these gives them full control over your phone.</p>
                </div>
                <div className="awareness-card glass-card">
                  <div className="card-badge">Guide</div>
                  <h3>Securing Remote Work</h3>
                  <p className="post-content">Always use a VPN when connecting to corporate networks from public cafes. Ensure your home router firmware is updated.</p>
                </div>
                <div className="awareness-card glass-card">
                  <div className="card-badge">Best Practice</div>
                  <h3>Password Hygiene</h3>
                  <p className="post-content">Stop reusing passwords. Use a reliable password manager and generate strings at least 16 characters long for critical accounts.</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Awareness;
