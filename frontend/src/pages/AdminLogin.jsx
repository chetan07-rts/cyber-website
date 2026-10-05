import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Save user & token to localStorage
      localStorage.setItem('adminInfo', JSON.stringify(data));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page animate-fade-in">
      <div className="container">
        <div className="login-box glass-card">
          <div className="text-center mb-4">
            <h2 className="text-red">SECURE LOGIN</h2>
            <p className="text-muted">Authorized Personnel Only</p>
          </div>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Admin ID (Email)</label>
              <input 
                type="email" 
                className="form-control" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Access Code (Password)</label>
              <input 
                type="password" 
                className="form-control" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Authenticating...' : 'Enter System'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
