import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [reports, setReports] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('reports'); // 'reports' or 'posts'
  const [loading, setLoading] = useState(true);
  
  // Post Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Alert');
  
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('adminInfo');
    if (!userInfo) {
      navigate('/admin/login');
    } else {
      setAdminInfo(JSON.parse(userInfo));
    }
  }, [navigate]);

  useEffect(() => {
    if (adminInfo) {
      fetchData();
    }
  }, [adminInfo, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${adminInfo.token}` }
      };
      
      if (activeTab === 'reports') {
        const { data } = await axios.get('http://localhost:5000/api/reports', config);
        setReports(data);
      } else {
        const { data } = await axios.get('http://localhost:5000/api/posts', config);
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const deleteReport = async (id) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
        await axios.delete(`http://localhost:5000/api/reports/${id}`, config);
        setReports(reports.filter((r) => r._id !== id));
      } catch (error) {
        alert('Error deleting report');
      }
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/posts', {
        title, content, category
      }, config);
      
      setPosts([data, ...posts]);
      setTitle('');
      setContent('');
      alert('Post created successfully!');
    } catch (error) {
       alert(error.response?.data?.message || 'Error creating post');
    }
  };

  const deletePost = async (id) => {
    if (window.confirm('Delete this awareness post?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
        await axios.delete(`http://localhost:5000/api/posts/${id}`, config);
        setPosts(posts.filter((p) => p._id !== id));
      } catch (error) {
        alert('Error deleting post');
      }
    }
  };

  const updateReportStatus = async (id, status) => {
    try {
        const config = { headers: { Authorization: `Bearer ${adminInfo.token}` } };
        await axios.put(`http://localhost:5000/api/reports/${id}/status`, { status }, config);
        setReports(reports.map(r => r._id === id ? { ...r, status } : r));
    } catch (error) {
        alert('Error updating status');
    }
  };

  if (!adminInfo) return null;

  return (
    <div className="dashboard-page animate-fade-in">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>NCSPP Admin</h2>
          <p className="admin-email">{adminInfo.email}</p>
        </div>
        <ul className="sidebar-nav">
          <li className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>
             Threat Reports
          </li>
          <li className={activeTab === 'posts' ? 'active' : ''} onClick={() => setActiveTab('posts')}>
             Awareness Posts
          </li>
        </ul>
        <button className="btn btn-outline logout-btn" onClick={logout}>Secure Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>{activeTab === 'reports' ? 'Threat Reports Center' : 'Awareness Post Manager'}</h1>
        </div>

        {loading ? (
          <div className="text-center mt-5"><div className="radar-loader mx-auto"></div></div>
        ) : (
          <div className="dashboard-body">
            
            {/* REPORTS TAB */}
            {activeTab === 'reports' && (
              <div className="data-table-container glass-card">
                {reports.length === 0 ? <p>No reports found.</p> : (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Reporter</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Evidence</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report._id}>
                          <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                          <td><span className="badge-type">{report.crimeType}</span></td>
                          <td>
                            <strong>{report.name}</strong><br/>
                            <a href={`mailto:${report.email}`}>{report.email}</a><br/>
                            {report.phone}
                          </td>
                          <td className="desc-cell">{report.description}</td>
                          <td>
                             <select 
                               value={report.status} 
                               onChange={(e) => updateReportStatus(report._id, e.target.value)}
                               className={`status-select ${report.status.toLowerCase()}`}
                             >
                               <option value="Pending">Pending</option>
                               <option value="Investigating">Investigating</option>
                               <option value="Resolved">Resolved</option>
                             </select>
                          </td>
                          <td>
                            {report.evidencePath ? (
                              <a href={`http://localhost:5000${report.evidencePath}`} target="_blank" rel="noreferrer" className="text-blue">View File</a>
                            ) : 'None'}
                          </td>
                          <td>
                            <button className="btn-icon text-red" onClick={() => deleteReport(report._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* POSTS TAB */}
            {activeTab === 'posts' && (
              <div className="posts-manager">
                <div className="glass-card mb-4">
                  <h3>Create New Awareness Post</h3>
                  <form onSubmit={createPost} className="form-inline-grid">
                    <div className="form-group">
                      <label>Title</label>
                      <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Alert">Alert</option>
                        <option value="Guide">Guide</option>
                        <option value="Best Practice">Best Practice</option>
                      </select>
                    </div>
                    <div className="form-group full-width">
                      <label>Content</label>
                      <textarea className="form-control textarea" rows="3" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary full-width">Publish Post</button>
                  </form>
                </div>

                <div className="glass-card">
                   <h3>Existing Posts</h3>
                   {posts.length === 0 ? <p>No posts published.</p> : (
                     <table className="data-table">
                       <thead>
                         <tr>
                           <th>Date</th>
                           <th>Title</th>
                           <th>Category</th>
                           <th>Actions</th>
                         </tr>
                       </thead>
                       <tbody>
                         {posts.map(p => (
                           <tr key={p._id}>
                             <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                             <td>{p.title}</td>
                             <td>{p.category}</td>
                             <td><button className="btn-icon text-red" onClick={() => deletePost(p._id)}>Delete</button></td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                   )}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
