import './Contact.css';

const Contact = () => {
  return (
    <div className="container section animate-fade-in">
      <div className="text-center">
        <h1>Contact NCSPP</h1>
        <p className="section-desc">For non-emergencies and general inquiries regarding cybersecurity programs.</p>
      </div>

      <div className="grid grid-2 contact-grid mt-5">
        <div className="contact-info">
          <div className="glass-card mb-4 info-card">
            <h3>National Headquarters</h3>
            <p>Department of Cyber Defense</p>
            <p>123 Security Avenue, Tech Park</p>
            <p>New Delhi - 110001</p>
          </div>

          <div className="glass-card mb-4 info-card">
            <h3>Emergency Helplines</h3>
            <p className="text-large text-red">National Cyber Crime Helpline: <strong>1930</strong></p>
            <p className="text-muted mt-2">Available 24x7. Only dial for immediate financial frauds in progress.</p>
          </div>

          <div className="glass-card info-card">
            <h3>Email Directory</h3>
            <p>General Queries: <strong>info@ncspp.gov.in</strong></p>
            <p>Report Incidents: <strong>incident@ncspp.gov.in</strong></p>
            <p>Press & Media: <strong>media@ncspp.gov.in</strong></p>
          </div>
        </div>

        <div className="contact-form glass-card">
          <h2 className="mb-4">Send an Inquiry</h2>
          <form onSubmit={(e) => { e.preventDefault(); alert("Inquiry sent to admin."); e.target.reset(); }}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" className="form-control" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea className="form-control textarea" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
