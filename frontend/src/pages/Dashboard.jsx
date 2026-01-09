import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, clearUserData } from '../utils/auth';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getUserData();
    if (!userData) {
      navigate('/login');
    } else {
      setUser(userData);
    }
  }, [navigate]);

  const handleLogout = () => {
    clearUserData();
    navigate('/login');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const staticUsers = [
    {
      id: 1,
      name: 'Michael Holz',
      dateCreated: '04/10/2013',
      role: 'Admin',
      status: 'Active',
      avatar: '👨',
    },
    {
      id: 2,
      name: 'Paula Wilson',
      dateCreated: '05/08/2014',
      role: 'Publisher',
      status: 'Active',
      avatar: '👩',
    },
    {
      id: 3,
      name: 'Antonio Moreno',
      dateCreated: '11/05/2015',
      role: 'Publisher',
      status: 'Suspended',
      avatar: '👨',
    },
    {
      id: 4,
      name: 'Mary Saveley',
      dateCreated: '06/09/2016',
      role: 'Reviewer',
      status: 'Active',
      avatar: '👩',
    },
    {
      id: 5,
      name: 'Martin Sommer',
      dateCreated: '12/08/2017',
      role: 'Moderator',
      status: 'Inactive',
      avatar: '👨',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#4caf50';
      case 'Suspended':
        return '#f44336';
      case 'Inactive':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>User Management</h1>
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Date Created</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {staticUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <div className="user-cell">
                      <span className="user-avatar">{user.avatar}</span>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.dateCreated}</td>
                  <td>{user.role}</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(user.status) }}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-btn edit-btn" title="Edit">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button className="action-btn delete-btn" title="Delete">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button className="page-btn">Previous</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <button className="page-btn">4</button>
            <button className="page-btn">5</button>
            <button className="page-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

