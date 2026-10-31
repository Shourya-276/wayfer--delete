// Wayfer Account Deletion - LocalStorage Manager & Sample Data

const STORAGE_KEY = 'wayfer_deletion_requests';
const AUTH_KEY = 'wayfer_admin_session';

const INITIAL_REQUESTS = [
  {
    id: 'WAY-DEL-89241',
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 234-5678',
    userId: 'WF-US-9921',
    scope: 'all',
    scopeLabel: 'Complete Account & All Data Erasure',
    reason: 'Switched to public transit; no longer using the app.',
    submittedAt: '2026-10-28T09:15:00Z',
    status: 'In Grace Period',
    gracePeriodEndsAt: '2026-11-11T09:15:00Z',
    adminNotes: 'ID confirmed via registered phone number. In 14-day hold period.',
    ipAddress: '198.51.100.42'
  },
  {
    id: 'WAY-DEL-76319',
    fullName: 'Sophia Martinez',
    email: 'sophia.m@gmail.com',
    phone: '+1 (555) 876-1234',
    userId: 'WF-US-4029',
    scope: 'location',
    scopeLabel: 'Location Telemetry & Trip History Only',
    reason: 'Privacy preference for GPS history cleanup.',
    submittedAt: '2026-10-29T14:32:00Z',
    status: 'In Review',
    gracePeriodEndsAt: '2026-11-12T14:32:00Z',
    adminNotes: 'Pending telematics database purge verification.',
    ipAddress: '203.0.113.19'
  },
  {
    id: 'WAY-DEL-65102',
    fullName: 'Marcus Sterling',
    email: 'm.sterling@corporate.org',
    phone: '+1 (555) 345-9871',
    userId: 'WF-US-1152',
    scope: 'all',
    scopeLabel: 'Complete Account & All Data Erasure',
    reason: 'Company fleet replaced mobile providers.',
    submittedAt: '2026-10-20T11:04:00Z',
    status: 'Completed',
    gracePeriodEndsAt: '2026-11-03T11:04:00Z',
    adminNotes: 'Grace period elapsed. Database records purged permanently on 2026-10-31.',
    ipAddress: '192.0.2.77'
  },
  {
    id: 'WAY-DEL-48903',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@outlook.com',
    phone: '+44 20 7946 0912',
    userId: 'WF-UK-3310',
    scope: 'marketing',
    scopeLabel: 'Marketing & Telemetry Preferences Only',
    reason: 'Unsubscribing from marketing alerts and analytics.',
    submittedAt: '2026-10-30T17:45:00Z',
    status: 'Pending Verification',
    gracePeriodEndsAt: '2026-11-13T17:45:00Z',
    adminNotes: 'New submission via web form. Awaiting verification queue.',
    ipAddress: '198.51.100.89'
  },
  {
    id: 'WAY-DEL-31088',
    fullName: 'David K. Miller',
    email: 'dkmiller99@yahoo.com',
    phone: '+1 (555) 678-4321',
    userId: 'WF-US-8712',
    scope: 'all',
    scopeLabel: 'Complete Account & All Data Erasure',
    reason: 'Duplicate account created by mistake.',
    submittedAt: '2026-10-26T08:20:00Z',
    status: 'Cancelled by User',
    gracePeriodEndsAt: '2026-11-09T08:20:00Z',
    adminNotes: 'User revoked deletion request on Day 2.',
    ipAddress: '203.0.113.104'
  }
];

export function getRequests() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading requests from localStorage:', err);
    return INITIAL_REQUESTS;
  }
}

export function saveRequests(requests) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch (err) {
    console.error('Error saving requests:', err);
  }
}

export function addRequest(formData) {
  const requests = getRequests();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const newId = `WAY-DEL-${randomSuffix}`;

  const now = new Date();
  const gracePeriodEnd = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  const scopeLabels = {
    all: 'Complete Account & All Data Erasure',
    location: 'Location Telemetry & Trip History Only',
    marketing: 'Marketing & Telemetry Preferences Only'
  };

  const newRequest = {
    id: newId,
    fullName: formData.fullName.trim(),
    email: formData.email.trim().toLowerCase(),
    phone: formData.phone.trim(),
    userId: formData.userId?.trim() || `WF-GUEST-${Math.floor(1000 + Math.random() * 9000)}`,
    scope: formData.scope || 'all',
    scopeLabel: scopeLabels[formData.scope] || 'Complete Account & All Data Erasure',
    reason: formData.reason || 'Requested by account holder',
    submittedAt: now.toISOString(),
    status: 'Pending Verification',
    gracePeriodEndsAt: gracePeriodEnd.toISOString(),
    adminNotes: 'Web submission received. Ready for verification review.',
    ipAddress: '127.0.0.1 (Web Portal)'
  };

  const updated = [newRequest, ...requests];
  saveRequests(updated);
  return newRequest;
}

export function updateRequestStatus(id, status, notes) {
  const requests = getRequests();
  const updated = requests.map(req => {
    if (req.id === id) {
      return {
        ...req,
        status,
        ...(notes !== undefined ? { adminNotes: notes } : {})
      };
    }
    return req;
  });
  saveRequests(updated);
  return updated;
}

export function deleteRequest(id) {
  const requests = getRequests();
  const updated = requests.filter(req => req.id !== id);
  saveRequests(updated);
  return updated;
}

export function cancelRequestByUser(id) {
  return updateRequestStatus(id, 'Cancelled by User', 'Cancelled by account holder during grace period.');
}

export function getRequestByRefOrEmail(query) {
  if (!query) return null;
  const requests = getRequests();
  const q = query.trim().toLowerCase();
  return requests.find(r => r.id.toLowerCase() === q || r.email.toLowerCase() === q) || null;
}

export function resetToDefaultData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REQUESTS));
  return INITIAL_REQUESTS;
}

export function checkAdminAuth() {
  try {
    return localStorage.getItem(AUTH_KEY) === 'authenticated';
  } catch {
    return false;
  }
}

export function setAdminAuth(isAuth) {
  try {
    if (isAuth) {
      localStorage.setItem(AUTH_KEY, 'authenticated');
    } else {
      localStorage.removeItem(AUTH_KEY);
    }
  } catch (e) {
    console.error(e);
  }
}

export function exportRequestsToCSV() {
  const requests = getRequests();
  const headers = ['Request ID', 'Full Name', 'Email', 'Phone', 'Account ID', 'Scope', 'Status', 'Submitted At', 'Grace Period Ends', 'Admin Notes'];
  
  const rows = requests.map(r => [
    `"${r.id}"`,
    `"${r.fullName}"`,
    `"${r.email}"`,
    `"${r.phone}"`,
    `"${r.userId}"`,
    `"${r.scopeLabel}"`,
    `"${r.status}"`,
    `"${r.submittedAt}"`,
    `"${r.gracePeriodEndsAt}"`,
    `"${(r.adminNotes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `wayfer_deletion_requests_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
