import React from 'react';

const brandColor = '#00b0ff';

function AdminDashboard() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h2 style={{ color: brandColor }}>Admin Dashboard - Platform Owner</h2>
      <p style={{ color: '#555' }}>Manage platform commissions, approvals, and system settings.</p>
    </div>
  );
}

export default AdminDashboard;