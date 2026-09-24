import React, { useState } from 'react';

const brandColor = '#00b0ff';

function Auth({ role, onLogin, onBack }) {
  // Toggle between Login and Sign Up modes
  const [isLogin, setIsLogin] = useState(true);
  
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Handle form submission for both Login and Registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
        // --- Login Process ---
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email, password: password })
            });

            if (response.ok) {
                const data = await response.json();
                // Validate if the selected role matches the user's stored role
                if (data.user.role !== role.toLowerCase()) {
                    alert("Invalid credentials or wrong role selected!");
                    return;
                }
                alert("Login successful!");
                // Trigger the onLogin callback with user data
                if (onLogin) onLogin(data.user); 
            } else {
                alert("Invalid email or password!");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    } else {
        // --- Sign Up / Registration Process ---
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    full_name: fullName, 
                    email: email, 
                    password: password,
                    role: role.toLowerCase()
                })
            });

            if (response.ok) {
                alert("Account created successfully! You can now login.");
                setIsLogin(true); // Switch back to login view after successful registration
            } else {
                const errorData = await response.json();
                
                // Handle Pydantic validation errors array safely to prevent [object Object] alert
                if (Array.isArray(errorData.detail)) {
                    const errorMessages = errorData.detail.map(err => err.msg).join(", ");
                    alert("Validation Error: " + errorMessages);
                } else {
                    alert("Error: " + (errorData.detail || "Registration failed"));
                }
            }
        } catch (error) {
            console.error("Error registering:", error);
        }
    }
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