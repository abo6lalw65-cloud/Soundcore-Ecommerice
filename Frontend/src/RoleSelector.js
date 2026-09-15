import React from 'react';

const brandColor = '#00b0ff';

function RoleSelector({ onSelectRole }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f6', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <img src="/images/logo.png" alt="Soundcore Logo" style={{ width: '60px', marginBottom: '20px', objectFit: 'contain' }} />
        <h2 style={{ color: brandColor, margin: '0 0 10px 0' }}>Welcome to Soundcore</h2>
        <p style={{ color: '#666', marginBottom: '30px' }}>Please select your role to continue:</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            onClick={() => onSelectRole('customer')}
            style={{ backgroundColor: brandColor, color: 'white', border: 'none', padding: '12px', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Customer (Storefront)
          </button>
          
          <button 
            onClick={() => onSelectRole('seller')}
            style={{ backgroundColor: '#282c34', color: 'white', border: 'none', padding: '12px', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Seller Dashboard
          </button>

          <button 
            onClick={() => onSelectRole('admin')}
            style={{ backgroundColor: '#ffc107', color: '#333', border: 'none', padding: '12px', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Admin (Platform Owner)
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelector;