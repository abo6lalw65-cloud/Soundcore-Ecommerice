import React, { useState } from 'react';

function Register() {
  // 1. استخدام useState لحفظ القيم التي يدخلها المستخدم في الحقول
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer'); // القيمة الافتراضية عميل
  const [message, setMessage] = useState('');     // لعرض رسالة النجاح أو الخطأ

  // 2. الدالة التي تعمل عند الضغط على زر التسجيل
  const handleSubmit = async (e) => {
    e.preventDefault(); // لمنع إعادة تحميل الصفحة تلقائياً

    try {
      // إرسال البيانات للباك إند عبر fetch بطريقة POST
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          password: password,
          role: role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`تم التسجيل بنجاح! أهلاً بك يا ${data.user.full_name}`);
      } else {
        setMessage(`حدث خطأ: ${data.detail || 'فشل التسجيل'}`);
      }
    } catch (error) {
      console.error('Error connecting to backend:', error);
      setMessage('تعذر الاتصال بالسيرفر، تأكد أن الباك إند يعمل.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>إنشاء حساب جديد في متجر Soundcore</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>الاسم الكامل:</label><br />
          <input 
            type="text" 
            value={fullName} 
            onChange={(e) => setFullName(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>البريد الإلكتروني:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>كلمة المرور:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>نوع الحساب (الدور):</label><br />
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="customer">عميل (Customer)</option>
            <option value="seller">بائع (Seller)</option>
          </select>
        </div>

        <button 
          type="submit" 
          style={{ width: '100%', padding: '10px', backgroundColor: '#00b0ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          تسجيل الحساب
        </button>
      </form>

      {/* عرض رسالة الرد للمستخدم */}
      {message && <p style={{ marginTop: '15px', fontWeight: 'bold', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}

export default Register;