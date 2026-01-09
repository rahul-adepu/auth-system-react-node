import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, clearUserData } from '../utils/auth';

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
        return 'bg-[#4caf50]';
      case 'Suspended':
        return 'bg-[#f44336]';
      case 'Inactive':
        return 'bg-[#ff9800]';
      default:
        return 'bg-[#9e9e9e]';
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="mb-8 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5">
          <h1 className="text-[28px] font-semibold text-[#333]">User Management</h1>
          <div className="flex items-center gap-5">
            <span className="text-[14px] text-[#666]">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="rounded bg-[#f44336] px-4 py-2 text-[14px] text-white transition hover:bg-[#d32f2f]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-5">
        <div className="overflow-hidden rounded-lg bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
          <table className="w-full border-collapse">
            <thead className="bg-[#f8f9fa]">
              <tr>
                <th className="border-b-2 border-[#e0e0e0] px-4 py-4 text-left text-[14px] font-semibold text-[#333]">#</th>
                <th className="border-b-2 border-[#e0e0e0] px-4 py-4 text-left text-[14px] font-semibold text-[#333]">Name</th>
                <th className="border-b-2 border-[#e0e0e0] px-4 py-4 text-left text-[14px] font-semibold text-[#333]">Date Created</th>
                <th className="border-b-2 border-[#e0e0e0] px-4 py-4 text-left text-[14px] font-semibold text-[#333]">Role</th>
                <th className="border-b-2 border-[#e0e0e0] px-4 py-4 text-left text-[14px] font-semibold text-[#333]">Status</th>
                <th className="border-b-2 border-[#e0e0e0] px-4 py-4 text-left text-[14px] font-semibold text-[#333]">Action</th>
              </tr>
            </thead>
            <tbody>
              {staticUsers.map((row) => (
                <tr key={row.id} className="border-b border-[#e0e0e0] text-[14px] text-[#666] hover:bg-[#f8f9fa]">
                  <td className="px-4 py-4">{row.id}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0e0e0] text-[20px]">
                        {row.avatar}
                      </span>
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">{row.dateCreated}</td>
                  <td className="px-4 py-4">{row.role}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-[12px] font-medium text-white ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <button className="flex h-8 w-8 items-center justify-center rounded text-[#2196f3] transition hover:bg-[#e3f2fd]" title="Edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button className="flex h-8 w-8 items-center justify-center rounded text-[#f44336] transition hover:bg-[#ffebee]" title="Delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

          <div className="flex items-center justify-end gap-2 border-t border-[#e0e0e0] p-5">
            {['Previous', '1', '2', '3', '4', '5', 'Next'].map((label) => {
              const isActive = label === '1';
              return (
                <button
                  key={label}
                  className={
                    isActive
                      ? 'rounded border border-[#2196f3] bg-[#2196f3] px-3 py-2 text-[14px] text-white'
                      : 'rounded border border-[#e0e0e0] bg-white px-3 py-2 text-[14px] text-[#666] transition hover:border-[#2196f3] hover:bg-[#f5f5f5] hover:text-[#2196f3]'
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

