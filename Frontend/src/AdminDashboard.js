import React from 'react';

const brandColor = '#00b0ff';

function AdminDashboard({ usersDB, sellersDB, products, setSellersDB, onLogout }) {

  // Function to approve a pending seller
  const handleApproveSeller = (sellerId) => {
    const updatedSellers = sellersDB.map(s => {
      if (s.seller_id === sellerId) {
        return { ...s, approval_status: 'approved' };
      }
      return s;
    });
    setSellersDB(updatedSellers);
    alert('Seller approved successfully!');
  };

  // Filter users by roles
  const customers = usersDB.filter(u => u.role === 'customer');
  const sellers = usersDB.filter(u => u.role === 'seller');

  // Calculate platform metrics & commissions (e.g., 10% commission rate on all products total value)
  const commissionRate = 0.10; // 10%
  const totalMarketValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const totalEstimatedCommission = totalMarketValue * commissionRate;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '15px', marginBottom: '30px' }}>
        <h2 style={{ margin: 0, color: brandColor }}>Admin Control Panel (Platform Owner)</h2>
        <button onClick={onLogout} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
          Logout
        </button>
      </nav>

      {/* Overview Cards */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', textAlign: 'center', width: '25%', border: '1px solid #ddd' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Total Customers</h4>
          <h2 style={{ color: brandColor, margin: 0 }}>{customers.length}</h2>
        </div>
        
        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', textAlign: 'center', width: '25%', border: '1px solid #ddd' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Total Sellers</h4>
          <h2 style={{ color: '#282c34', margin: 0 }}>{sellers.length}</h2>
        </div>

        <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', textAlign: 'center', width: '30%', border: '1px solid #ddd' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#555' }}>Est. Platform Commissions (10%)</h4>
          <h2 style={{ color: '#28a745', margin: 0 }}>${totalEstimatedCommission.toFixed(2)}</h2>
        </div>
      </div>

      {/* Section 1: Sellers & Approvals */}
      <section style={{ marginBottom: '40px' }}>
        <h3>Sellers Management & Approvals</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ background: '#f1f1f1', textAlign: 'left' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Seller Name</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Approval Status</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => {
              const sellerStore = sellersDB.find(s => s.seller_id === seller.id) || { approval_status: 'pending' };
              return (
                <tr key={seller.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{seller.fullName}</td>
                  <td style={{ padding: '10px' }}>{seller.email}</td>
                  <td style={{ padding: '10px', fontWeight: 'bold', color: sellerStore.approval_status === 'approved' ? 'green' : 'orange' }}>
                    {sellerStore.approval_status.toUpperCase()}
                  </td>
                  <td style={{ padding: '10px' }}>
                    {sellerStore.approval_status !== 'approved' && (
                      <button 
                        onClick={() => handleApproveSeller(seller.id)}
                        style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Section 2: All Products Across Marketplace */}
      <section style={{ marginBottom: '40px' }}>
        <h3>All Marketplace Products (By Sellers)</h3>
        {products.length === 0 ? (
          <p style={{ color: 'gray' }}>No products uploaded in the market.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ background: '#f1f1f1', textAlign: 'left' }}>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Product Name</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Seller</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Price</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Stock</th>
                <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Admin Commission (10%)</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={p.image} alt={p.name} style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                    {p.name}
                  </td>
                  <td style={{ padding: '10px' }}>{p.seller_name}</td>
                  <td style={{ padding: '10px' }}>${p.price}</td>
                  <td style={{ padding: '10px' }}>{p.stock}</td>
                  <td style={{ padding: '10px', color: '#28a745', fontWeight: 'bold' }}>${(p.price * commissionRate).toFixed(2)} per unit</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Section 3: Registered Customers */}
      <section>
        <h3>Registered Customers ({customers.length})</h3>
        <ul style={{ background: 'white', padding: '15px 30px', borderRadius: '5px', border: '1px solid #ddd', margin: 0 }}>
          {customers.map((c) => (
            <li key={c.id} style={{ padding: '5px 0', borderBottom: '1px solid #eee' }}>
              <strong>{c.fullName}</strong> — <span style={{ color: '#666' }}>{c.email}</span>
            </li>
          ))}
        </ul>
      </section>

    </div>
  );
}

export default AdminDashboard;