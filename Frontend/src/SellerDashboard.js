import React, { useState } from 'react';

const brandColor = '#00b0ff';

function SellerDashboard() {
  const [sellerProducts, setSellerProducts] = useState([
    { id: 1, name: 'Soundcore C30i', price: 49.99, category: 'Earbuds', stock: 15, image: '/images/c30i.png' }
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '', image: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    
    const productItem = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category || 'General',
      stock: parseInt(newProduct.stock) || 1,
      image: newProduct.image || '/logo.png'
    };

    setSellerProducts([...sellerProducts, productItem]);
    setNewProduct({ name: '', price: '', category: '', stock: '', image: '' });
  };

  const handleDeleteProduct = (productId) => {
    setSellerProducts(sellerProducts.filter((item) => item.id !== productId));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: brandColor, textAlign: 'center' }}>Seller Dashboard - Inventory Management</h2>

      <form onSubmit={handleAddProduct} style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '30px', border: '1px solid #ddd' }}>
        <h3>Add New Product</h3>
        <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
          <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <input type="number" name="price" placeholder="Price ($)" value={newProduct.price} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <input type="number" name="stock" placeholder="Stock Quantity" value={newProduct.stock} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
        </div>
        <input type="text" name="image" placeholder="Image Path (e.g., /c30i.png)" value={newProduct.image} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd', width: '100%', marginTop: '10px' }} />
        <button type="submit" style={{ backgroundColor: brandColor, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '15px', width: '100%', fontWeight: 'bold' }}>
          Add Product to Store
        </button>
      </form>

      <h3>Your Products Inventory</h3>
      {sellerProducts.length === 0 ? (
        <p style={{ color: 'gray' }}>No products added yet.</p>
      ) : (
        <div>
          {sellerProducts.map((product) => (
            <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
              <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '5px' }} />
              <div style={{ flex: 1, marginLeft: '15px', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{product.name}</h4>
                <p style={{ margin: '0', color: '#555' }}>Price: <span style={{ color: brandColor, fontWeight: 'bold' }}>${product.price}</span> | Stock: {product.stock}</p>
              </div>
              <button 
                onClick={() => handleDeleteProduct(product.id)}
                style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;