import { useState } from 'react';
import axios from 'axios';
import './Report.css';

const Report = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    crimeType: 'Financial Fraud',
    description: '',
  });
  const [evidence, setEvidence] = useState(null);
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  const { name, email, phone, crimeType, description } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFileChange = (e) => {
    setEvidence(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });

    // Client side validation
    if (!name || !email || !phone || !description) {
      setStatus({ submitting: false, success: false, error: 'Please fill in all required fields' });
      return;
    }

    try {
      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('phone', phone);
      data.append('crimeType', crimeType);
      data.append('description', description);
      if (evidence) {
        data.append('evidence', evidence);
      }

      await axios.post('http://localhost:5000/api/reports', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setStatus({ submitting: false, success: true, error: '' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        crimeType: 'Financial Fraud',
        description: '',
      });
      setEvidence(null);
      // Reset file input
      document.getElementById('evidence').value = "";
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="container section animate-fade-in">
      <div className="report-header text-center">
        <h1>Report Cyber Threat</h1>
        <p className="section-desc">
          File a formal complaint regarding any cyber crime or online threat. All submissions are secured and monitored.
        </p>
      </div>

      <div className="report-container">
        <form onSubmit={onSubmit} className="glass-card report-form">
          {status.error && <div className="alert alert-danger">{status.error}</div>}
          {status.success && (
            <div className="alert alert-success">
              Report submitted successfully. Your reference code has been emailed to you.
            </div>
          )}

          <div className="grid grid-2">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input type="text" id="name" name="name" className="form-control" value={name} onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input type="tel" id="phone" name="phone" className="form-control" value={phone} onChange={onChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" name="email" className="form-control" value={email} onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="crimeType">Type of Cyber Crime *</label>
            <select id="crimeType" name="crimeType" className="form-control select-dark" value={crimeType} onChange={onChange}>
              <option value="Financial Fraud">Financial Fraud</option>
              <option value="Identify Theft">Identity Theft</option>
              <option value="Cyber Bullying">Cyber Bullying / Harassment</option>
              <option value="Hacking">Hacking / Unauthorized Access</option>
              <option value="Phishing">Phishing / Scam</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Detailed Description *</label>
            <textarea
              id="description"
              name="description"
              className="form-control textarea"
              rows="5"
              value={description}
              onChange={onChange}
              placeholder="Provide as much detail as possible (dates, times, websites, etc.)"
            ></textarea>
          </div>

          <div className="form-group file-upload-group">
            <label htmlFor="evidence">Upload Evidence (Screenshots, PDFs, etc.)</label>
            <input type="file" id="evidence" name="evidence" className="form-control file-input" onChange={onFileChange} accept=".jpg,.jpeg,.png,.pdf,.doc,.docx" />
            <span className="file-info">Max size: 10MB</span>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={status.submitting}>
            {status.submitting ? 'Submitting Securely...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Report;
