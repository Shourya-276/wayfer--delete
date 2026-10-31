import React, { useState, useEffect } from 'react';
import { 
  getRequests, 
  saveRequests, 
  updateRequestStatus, 
  deleteRequest, 
  resetToDefaultData, 
  exportRequestsToCSV,
  checkAdminAuth,
  setAdminAuth,
  addRequest
} from '../utils/storage';
import { 
  Lock, 
  KeyRound, 
  LogOut, 
  Search, 
  Filter, 
  Download, 
  PlusCircle, 
  RotateCcw, 
  CheckCircle, 
  Trash2, 
  Edit3, 
  Eye, 
  AlertTriangle, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Calendar,
  X,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function AdminPanel({ onExitToSite }) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(checkAdminAuth());
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Dashboard Data State
  const [requests, setRequests] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal States
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editNotes, setEditNotes] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Manual Add Form State
  const [manualForm, setManualForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    userId: '',
    scope: 'all',
    reason: 'Manual request received via Support Desk'
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadRequests();
    }
  }, [isAuthenticated]);

  const loadRequests = () => {
    const list = getRequests();
    setRequests(list);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = loginPass.trim();

    if (cleanEmail === 'admin@gmail.com' && cleanPass === 'shor@123') {
      setIsAuthenticated(true);
      setAdminAuth(true);
      setLoginError('');
      loadRequests();
      showToast('Admin authentication verified.');
    } else {
      setLoginError('Invalid credentials. Check email and password.');
    }
  };

  const handleAutofillDemo = () => {
    setLoginEmail('admin@gmail.com');
    setLoginPass('shor@123');
    setLoginError('');
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminAuth(false);
    setLoginEmail('');
    setLoginPass('');
    showToast('Admin session terminated.');
  };

  // Filter requests
  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      req.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      req.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
      req.phone.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || req.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate Metrics
  const totalCount = requests.length;
  const inGraceCount = requests.filter(r => r.status === 'In Grace Period').length;
  const pendingCount = requests.filter(r => r.status === 'Pending Verification' || r.status === 'In Review').length;
  const completedCount = requests.filter(r => r.status === 'Completed').length;
  const cancelledCount = requests.filter(r => r.status === 'Cancelled by User' || r.status === 'Rejected').length;

  // Status badge styling helper (Strictly B&W)
  const getBadgeStyle = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-solid';
      case 'In Grace Period':
        return 'badge-outline';
      case 'Pending Verification':
      case 'In Review':
        return 'badge-muted';
      case 'Cancelled by User':
      case 'Rejected':
        return 'badge-dim';
      default:
        return 'badge-muted';
    }
  };

  // Open inspection modal
  const openInspectModal = (req) => {
    setSelectedRequest(req);
    setEditNotes(req.adminNotes || '');
    setEditStatus(req.status);
  };

  // Save changes to selected request
  const handleSaveInspect = () => {
    if (!selectedRequest) return;
    const updated = updateRequestStatus(selectedRequest.id, editStatus, editNotes);
    setRequests(updated);
    setSelectedRequest(null);
    showToast(`Request ${selectedRequest.id} updated to "${editStatus}".`);
  };

  // Quick action: Complete request
  const handleQuickComplete = (id) => {
    const updated = updateRequestStatus(id, 'Completed', 'Manually marked as Completed & Purged by Admin.');
    setRequests(updated);
    showToast(`Request ${id} marked as Completed.`);
  };

  // Delete Record
  const handleDelete = (id) => {
    if (window.confirm(`Permanently delete the audit record for ${id}?`)) {
      const updated = deleteRequest(id);
      setRequests(updated);
      showToast(`Record ${id} removed.`);
    }
  };

  // Reset demo data
  const handleReset = () => {
    if (window.confirm('Reset all deletion requests back to original demonstration data?')) {
      const reset = resetToDefaultData();
      setRequests(reset);
      showToast('Sample request database restored.');
    }
  };

  // Handle Manual Add
  const handleManualAddSubmit = (e) => {
    e.preventDefault();
    if (!manualForm.fullName || !manualForm.email) {
      alert('Name and Email are required.');
      return;
    }
    const created = addRequest(manualForm);
    setRequests(getRequests());
    setShowAddModal(false);
    setManualForm({
      fullName: '',
      email: '',
      phone: '',
      userId: '',
      scope: 'all',
      reason: 'Manual request received via Support Desk'
    });
    showToast(`New request ${created.id} logged.`);
  };

  // IF NOT AUTHENTICATED: Show Login Screen
  if (!isAuthenticated) {
    return (
      <div style={{
        maxWidth: '480px',
        margin: '60px auto 100px auto',
        padding: '0 24px'
      }}>
        <div className="card animate-fade-in" style={{
          padding: '40px 32px',
          border: '1px solid #ffffff',
          boxShadow: 'var(--shadow-glow)'
        }}>
          {/* Logo & Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px'
            }}>
              <img src="/wayfer-logo.png" alt="WayFer Logo" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <span className="badge badge-outline" style={{ marginBottom: '8px' }}>
              RESTRICTED ACCESS
            </span>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '6px' }}>
              WayFer Admin Control
            </h1>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Sign in with administrative credentials to process user data deletion requests.
            </p>
          </div>

          {/* Quick Credential Hint Box */}
          <div style={{
            backgroundColor: '#0c0c0c',
            border: '1px dashed var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            marginBottom: '24px',
            fontSize: '0.82rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Configured Credentials:</span>
              <button
                type="button"
                onClick={handleAutofillDemo}
                className="btn-ghost"
                style={{ fontSize: '0.75rem', textDecoration: 'underline', padding: '2px 6px', color: '#ffffff' }}
              >
                Auto-fill
              </button>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <div>Login ID: <strong style={{ color: '#ffffff' }}>admin@gmail.com</strong></div>
              <div>Password: <strong style={{ color: '#ffffff' }}>shor@123</strong></div>
            </div>
          </div>

          {loginError && (
            <div style={{
              backgroundColor: '#161616',
              border: '1px solid #ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <AlertTriangle size={16} color="#ffffff" />
              <span style={{ fontSize: '0.84rem', color: '#ffffff' }}>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="adminEmail">Admin Login ID (Email)</label>
              <input
                id="adminEmail"
                type="email"
                className="form-input"
                placeholder="admin@gmail.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="adminPass">Password</label>
              <input
                id="adminPass"
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                required
              />
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '24px'
            }}>
              <label className="form-checkbox-label" style={{ fontSize: '0.82rem' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="form-checkbox"
                />
                <span>Remember session</span>
              </label>

              <button
                type="button"
                onClick={onExitToSite}
                className="btn-ghost"
                style={{ fontSize: '0.82rem', padding: 0 }}
              >
                Return to Site
              </button>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px' }}
            >
              Sign In to Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // IF AUTHENTICATED: Show Full Admin Panel Dashboard
  return (
    <div style={{
      maxWidth: '1240px',
      margin: '20px auto 80px auto',
      padding: '0 24px'
    }}>
      {/* Toast alert */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          backgroundColor: '#ffffff',
          color: '#000000',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          fontWeight: '600',
          fontSize: '0.88rem',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Check size={16} /> {toastMessage}
        </div>
      )}

      {/* Top Admin Action Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        borderBottom: '1px solid var(--border-medium)',
        paddingBottom: '20px',
        marginBottom: '28px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge badge-solid">ADMIN COMMAND CENTER</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Logged in as: admin@gmail.com
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', marginTop: '6px' }}>
            Account Deletion Queue
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary btn-sm"
          >
            <PlusCircle size={14} /> New Manual Request
          </button>
          <button
            onClick={exportRequestsToCSV}
            className="btn btn-secondary btn-sm"
            title="Download CSV report"
          >
            <Download size={14} /> Export CSV
          </button>
          <button
            onClick={handleReset}
            className="btn btn-ghost btn-sm"
            title="Restore sample demo data"
          >
            <RotateCcw size={14} /> Reset Data
          </button>
          <button
            onClick={onExitToSite}
            className="btn btn-secondary btn-sm"
          >
            Public Site
          </button>
          <button
            onClick={handleLogout}
            className="btn btn-danger btn-sm"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '14px',
        marginBottom: '32px'
      }}>
        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
            Total Requests
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>
            {totalCount}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>All logged entries</span>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
            In 14-Day Grace
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>
            {inGraceCount}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Active cancellation window</span>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
            Pending Review
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>
            {pendingCount}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Awaiting verification</span>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
            Purged / Completed
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>
            {completedCount}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Permanent wipe complete</span>
        </div>

        <div className="card" style={{ padding: '18px' }}>
          <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontFamily: 'var(--font-heading)' }}>
            Cancelled / Rejected
          </span>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>
            {cancelledCount}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Revoked by user/admin</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px',
        marginBottom: '20px'
      }}>
        {/* Search input */}
        <div style={{ position: 'relative', minWidth: '280px', flex: 1, maxWidth: '440px' }}>
          <Search size={16} color="var(--text-muted)" style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)'
          }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '38px', fontSize: '0.88rem' }}
            placeholder="Search by ID, name, email, or phone..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>

        {/* Status Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Status:</span>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '8px 34px 8px 12px', fontSize: '0.84rem' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses ({totalCount})</option>
            <option value="Pending Verification">Pending Verification</option>
            <option value="In Review">In Review</option>
            <option value="In Grace Period">In Grace Period</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled by User">Cancelled by User</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="table-container">
        <table className="mono-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Applicant</th>
              <th>Scope</th>
              <th>Submitted</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map(req => (
                <tr key={req.id}>
                  {/* ID */}
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#ffffff' }}>
                      {req.id}
                    </span>
                    {req.userId && !req.userId.startsWith('WF-GUEST-') && (
                      <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                        {req.userId}
                      </span>
                    )}
                  </td>

                  {/* Applicant Details */}
                  <td>
                    <strong style={{ color: '#ffffff', display: 'block' }}>{req.fullName}</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{req.email}</div>
                    {req.phone && req.phone !== 'Not specified' && (
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>{req.phone}</div>
                    )}
                  </td>

                  {/* Scope */}
                  <td>
                    <span style={{ fontSize: '0.82rem', color: '#ffffff' }}>{req.scopeLabel}</span>
                  </td>

                  {/* Submitted Date */}
                  <td>
                    <div style={{ fontSize: '0.82rem', color: '#ffffff' }}>
                      {new Date(req.submittedAt).toLocaleDateString()}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      Grace until: {new Date(req.gracePeriodEndsAt).toLocaleDateString()}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td>
                    <span className={`badge ${getBadgeStyle(req.status)}`}>
                      {req.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => openInspectModal(req)}
                        className="btn btn-secondary btn-sm"
                        title="View / Edit Details"
                      >
                        <Edit3 size={13} /> Review
                      </button>

                      {req.status !== 'Completed' && (
                        <button
                          onClick={() => handleQuickComplete(req.id)}
                          className="btn btn-ghost btn-sm"
                          title="Quick Mark Completed & Purged"
                          style={{ border: '1px solid var(--border-medium)' }}
                        >
                          <Check size={13} /> Purge
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(req.id)}
                        className="btn btn-ghost btn-sm"
                        title="Delete Record"
                        style={{ color: 'var(--text-dim)' }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  No requests found matching your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Inspect & Edit Details Modal */}
      {selectedRequest && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="card animate-fade-in" style={{
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '32px',
            border: '1px solid #ffffff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-outline">CASE INSPECTION</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginTop: '6px' }}>
                  {selectedRequest.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRequest(null)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '6px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Read-only User Details */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
              backgroundColor: '#0a0a0a',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              fontSize: '0.84rem',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem' }}>User Full Name</span>
                <strong style={{ color: '#ffffff' }}>{selectedRequest.fullName}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem' }}>Email Address</span>
                <strong style={{ color: '#ffffff' }}>{selectedRequest.email}</strong>
              </div>
              {selectedRequest.phone && selectedRequest.phone !== 'Not specified' && (
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem' }}>Phone Number</span>
                  <strong style={{ color: '#ffffff' }}>{selectedRequest.phone}</strong>
                </div>
              )}
              {selectedRequest.userId && !selectedRequest.userId.startsWith('WF-GUEST-') && (
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem' }}>Account / User ID</span>
                  <strong style={{ color: '#ffffff' }}>{selectedRequest.userId}</strong>
                </div>
              )}
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem' }}>Requested Scope</span>
                <strong style={{ color: '#ffffff' }}>{selectedRequest.scopeLabel}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.74rem' }}>Submitted At</span>
                <strong style={{ color: '#ffffff' }}>{new Date(selectedRequest.submittedAt).toLocaleString()}</strong>
              </div>
            </div>

            {/* Departure Reason */}
            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">User Feedback / Stated Reason</label>
              <div style={{
                backgroundColor: '#0a0a0a',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                fontSize: '0.86rem',
                color: 'var(--text-secondary)'
              }}>
                {selectedRequest.reason || 'None provided'}
              </div>
            </div>

            {/* Status Selector */}
            <div className="form-group">
              <label className="form-label" htmlFor="editStatus">Update Status</label>
              <select
                id="editStatus"
                className="form-select"
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
              >
                <option value="Pending Verification">Pending Verification</option>
                <option value="In Review">In Review</option>
                <option value="In Grace Period">In Grace Period (14 Days)</option>
                <option value="Completed">Completed (Data Purged)</option>
                <option value="Cancelled by User">Cancelled by User</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Admin Notes */}
            <div className="form-group">
              <label className="form-label" htmlFor="editNotes">Internal Security & Audit Notes</label>
              <textarea
                id="editNotes"
                className="form-textarea"
                rows={3}
                placeholder="Log internal action details (e.g., identity confirmed, purge job scheduled...)"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
              />
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => setSelectedRequest(null)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveInspect}
                className="btn btn-primary"
              >
                Save & Update Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Entry Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="card animate-fade-in" style={{
            maxWidth: '600px',
            width: '100%',
            padding: '32px',
            border: '1px solid #ffffff'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <span className="badge badge-outline">SUPPORT ENTRY</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginTop: '6px' }}>
                  Log Manual Deletion Request
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '6px' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleManualAddSubmit}>
              <div className="form-group">
                <label className="form-label">Customer Full Name *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={manualForm.fullName}
                  onChange={(e) => setManualForm({ ...manualForm, fullName: e.target.value })}
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Account Email *</label>
                <input
                  type="email"
                  className="form-input"
                  required
                  value={manualForm.email}
                  onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
                  placeholder="user@example.com"
                />
              </div>


              <div className="form-group">
                <label className="form-label">Erasure Scope</label>
                <select
                  className="form-select"
                  value={manualForm.scope}
                  onChange={(e) => setManualForm({ ...manualForm, scope: e.target.value })}
                >
                  <option value="all">Complete Account & All Data Erasure</option>
                  <option value="location">Location Telemetry & Route History Only</option>
                  <option value="marketing">Marketing & Telemetry Only</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Source / Ticket Reason</label>
                <input
                  type="text"
                  className="form-input"
                  value={manualForm.reason}
                  onChange={(e) => setManualForm({ ...manualForm, reason: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Create Request Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
