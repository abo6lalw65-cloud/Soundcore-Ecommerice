import React, { useState } from 'react';

const brandColor = '#00b0ff';

function Auth({ role, onLogin, onBack }) {
  // Toggle between Login and Sign Up modes
  const [isLogin, setIsLogin] = useState(true);
  
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // We send the form data back to App.js to process it against the Mock DB
    const authData = { email, password, fullName, role, isLogin };
    onLogin(authData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f7f6' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <img src="/images/logo.png" alt="Soundcore Logo" style={{ width: '60px', marginBottom: '15px' }} />
        <h2 style={{ color: brandColor, margin: '0 0 5px 0' }}>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p style={{ color: '#666', marginBottom: '20px', textTransform: 'capitalize' }}>
          Role: <strong>{role}</strong>
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {!isLogin && (
            <input 
              type="text" 
              placeholder="Full Name" 
              required 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }} 
            />
          )}
          
          <input 
            type="email" 
            placeholder="Email Address" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }} 
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ddd' }} 
          />
          
          <button type="submit" style={{ backgroundColor: brandColor, color: 'white', padding: '12px', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '20px', fontSize: '14px' }}>
          <span style={{ color: '#666' }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ background: 'none', border: 'none', color: brandColor, cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>

        <button 
          onClick={onBack} 
          style={{ marginTop: '20px', background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '14px' }}
        >
          &larr; Back to Role Selection
        </button>
      </div>
    </div>
  );
}

export default Auth;