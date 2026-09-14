import React from 'react';

// 1. Mock Data (Simulating data that will come from the backend database)
const products = [
  { id: 1, name: 'Soundcore C30i', price: 49.99, category: 'Earbuds', seller: 'Tech Store' },
  { id: 2, name: 'Soundcore Q40i', price: 99.99, category: 'Headphones', seller: 'Audio Hub' },
  { id: 3, name: 'Soundcore P30i', price: 59.99, category: 'Earbuds', seller: 'Tech Store' }
];

function App() {
  return (
    // 2. Main Page Container
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* 3. Website Header */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Soundcore Multi-Vendor E-Commerce Store</h1>
        <p>Browse the latest audio gear from multiple sellers</p>
      </header>

      {/* 4. Products Grid Container */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* 5. Mapping over the products array to generate product cards dynamically */}
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', width: '220px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h3>{product.name}</h3>
            <p style={{ color: 'gray', fontSize: '14px' }}>Seller: {product.seller}</p>
            <p style={{ color: '#555' }}>Category: {product.category}</p>
            <h2 style={{ color: '#007bff' }}>${product.price}</h2>
            
            <button style={{ backgroundColor: '#282c34', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
              Add to Cart
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;