// src/pages/Admin.jsx
import "../styles/Admin.css";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { useState, useEffect } from "react";
import api from "../utils/api";

function AdminContent() {
  const { logout, user } = useAuth();
  const [status, setStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState('overview');
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);

  const callAdminTest = async () => {
    setLoadingStatus(true);
    setStatus(null);
    try {
      const res = await api.get('/admin/test');
      setStatus({ ok: true, data: res.data });
    } catch (err) {
      setStatus({ ok: false, error: err.response?.data || err.message });
    } finally {
      setLoadingStatus(false);
    }
  };

  const fetchUsers = async () => {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data || []);
    } catch (err) {
      setUsersError(err.response?.data?.message || err.message || 'Could not fetch users');
      setUsers([]);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPanel === 'users' && users.length === 0) fetchUsers();
  }, [selectedPanel]);

  return (
    <>
      <TopNavbar />
      <div className="admin-page">
        <section className="admin-hero">
          <div className="overlay" />
          <div className="glow-accent"></div>
          <div className="glow-accent-2"></div>

          <div className="admin-grid">
            <aside className="admin-sidebar">
              <div className="admin-sidebar-header">
                <h2>Admin</h2>
                <p className="muted">Manage the platform</p>
              </div>
              <nav className="admin-nav">
                <button className={selectedPanel === 'overview' ? 'active' : ''} onClick={() => setSelectedPanel('overview')}>Overview</button>
                <button className={selectedPanel === 'users' ? 'active' : ''} onClick={() => setSelectedPanel('users')}>Manage Users</button>
                <button className={selectedPanel === 'events' ? 'active' : ''} onClick={() => setSelectedPanel('events')}>Manage Events</button>
                <button className={selectedPanel === 'groups' ? 'active' : ''} onClick={() => setSelectedPanel('groups')}>Manage Groups</button>
                <button className={selectedPanel === 'reports' ? 'active' : ''} onClick={() => setSelectedPanel('reports')}>Reports</button>
                <button className={selectedPanel === 'messages' ? 'active' : ''} onClick={() => setSelectedPanel('messages')}>Messages</button>
              </nav>

              <div className="admin-sidebar-foot">
                <button className="btn-secondary" onClick={callAdminTest} disabled={loadingStatus}>{loadingStatus ? 'Checking...' : 'Check API'}</button>
                <button className="btn-primary logout-btn" onClick={logout}>Log Out</button>
              </div>
            </aside>

            <main className="admin-main">
              {selectedPanel === 'overview' && (
                <div className="admin-overview">
                  <h1>Overview</h1>
                  <p className="subtitle">Key metrics and quick actions</p>

                  <div className="overview-cards">
                    <div className="overview-card">
                      <h3>Users</h3>
                      <p>{users.length} loaded</p>
                      <button className="btn-primary" onClick={() => setSelectedPanel('users')}>Manage Users</button>
                    </div>
                    <div className="overview-card">
                      <h3>Events</h3>
                      <p>Pending approvals, upcoming events</p>
                      <button className="btn-primary" onClick={() => setSelectedPanel('events')}>Manage Events</button>
                    </div>
                    <div className="overview-card">
                      <h3>Reports</h3>
                      <p>Open reports and issues</p>
                      <button className="btn-primary" onClick={() => setSelectedPanel('reports')}>View Reports</button>
                    </div>
                    <div className="overview-card">
                      <h3>Groups</h3>
                      <p>Group moderation</p>
                      <button className="btn-primary" onClick={() => setSelectedPanel('groups')}>Manage Groups</button>
                    </div>
                  </div>
                </div>
              )}

              {selectedPanel === 'users' && (
                <div className="users-panel">
                  <h2>Manage Users</h2>
                  {usersLoading && <p>Loading users...</p>}
                  {usersError && <p style={{ color: 'red' }}>{usersError}</p>}
                  {!usersLoading && users.length === 0 && !usersError && (
                    <p>No users found.</p>
                  )}
                  {users.length > 0 && (
                    <table className="users-table">
                      <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u._id || u.id}>
                            <td>{u.full_name || '—'}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                              <button onClick={async () => {
                                try {
                                  await api.patch(`/admin/users/${u._id || u.id}/approve`);
                                  await fetchUsers();
                                } catch (err) { alert('Could not approve user'); }
                              }} className="btn-primary">Approve</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}

              {selectedPanel === 'events' && (
                <div className="placeholder-panel">
                  <h2>Manage Events</h2>
                  <p>Event moderation tools will appear here.</p>
                  <button className="btn-primary" onClick={() => alert('Open events management (not implemented)')}>Open Events Manager</button>
                </div>
              )}

              {selectedPanel === 'groups' && (
                <div className="placeholder-panel">
                  <h2>Manage Groups</h2>
                  <p>Group moderation and approvals.</p>
                </div>
              )}

              {selectedPanel === 'reports' && (
                <div className="placeholder-panel">
                  <h2>Reports</h2>
                  <p>View user-submitted reports and take action.</p>
                </div>
              )}

              {selectedPanel === 'messages' && (
                <div className="placeholder-panel">
                  <h2>Messages</h2>
                  <p>Moderate messaging and broadcast messages.</p>
                </div>
              )}

            </main>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default function Admin() {
  return (
    <ProtectedRoute adminOnly>
      <AdminContent />
    </ProtectedRoute>
  );
}