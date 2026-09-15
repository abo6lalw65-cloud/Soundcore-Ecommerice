import React, { useState } from 'react';

const brandColor = '#00b0ff';

function SellerDashboard({ products, setProducts, currentUser, notifications }) {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', stock: '' });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    
    const productItem = {
      id: Date.now(),
      seller_id: currentUser.id,
      seller_name: currentUser.fullName,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category || 'General',
      stock: parseInt(newProduct.stock) || 1,
      image: selectedImage || '/images/logo.png'
    };

    setProducts([...products, productItem]);
    setNewProduct({ name: '', price: '', category: '', stock: '' });
    setSelectedImage(null);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((item) => item.id !== productId));
  };

  // Filter products and notifications for this specific seller
  const myProducts = products.filter(product => product.seller_id === currentUser.id);
  const myNotifications = notifications.filter(n => n.seller_id === currentUser.id);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: brandColor, textAlign: 'center' }}>Seller Dashboard</h2>

      {/* Notifications Section */}
      <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #bbdefb' }}>
        <h3 style={{ margin: '0 0 10px 0', color: '#0d47a1', fontSize: '18px' }}>🔔 Live Orders & Notifications ({myNotifications.length})</h3>
        {myNotifications.length === 0 ? (
          <p style={{ color: '#555', margin: 0, fontSize: '14px' }}>No new orders or notifications yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {myNotifications.map((note, index) => (
              <div key={index} style={{ background: 'white', padding: '10px 15px', borderRadius: '5px', borderLeft: `4px solid ${brandColor}`, fontSize: '14px' }}>
                <p style={{ margin: '0 0 3px 0', fontWeight: 'bold' }}>{note.message}</p>
                <span style={{ fontSize: '11px', color: '#888' }}>{note.time} | Shipping Address: {note.address}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} style={{ background: '#f8f9fa', padding: '20px', borderRadius: '10px', marginBottom: '30px', border: '1px solid #ddd' }}>
        <h3>Add New Product</h3>
        <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
          <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} required />
          <input type="number" name="price" placeholder="Price ($)" value={newProduct.price} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} required />
          <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} />
          <input type="number" name="stock" placeholder="Stock Quantity" value={newProduct.stock} onChange={handleInputChange} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ddd' }} required />
        </div>

        <div style={{ marginTop: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: 'bold' }}>Product Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ padding: '5px', width: '100%', boxSizing: 'border-box' }} />
        </div>

        {selectedImage && (
          <div style={{ marginTop: '10px', textAlign: 'left' }}>
            <span style={{ fontSize: '12px', color: '#666' }}>Preview:</span><br />
            <img src={selectedImage} alt="Preview" style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '5px', border: '1px solid #ddd', marginTop: '5px' }} />
          </div>
        )}

        <button type="submit" style={{ backgroundColor: brandColor, color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '15px', width: '100%', fontWeight: 'bold' }}>
          Add Product to Marketplace
        </button>
      </form>

      {/* Seller's Product List */}
      <h3>Your Uploaded Products Inventory</h3>
      {myProducts.length === 0 ? (
        <p style={{ color: 'gray' }}>You haven't added any products yet.</p>
      ) : (
        <div>
          {myProducts.map((product) => (
            <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
              <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '5px', border: '1px solid #eee' }} />
              <div style={{ flex: 1, marginLeft: '15px', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 5px 0' }}>{product.name}</h4>
                <p style={{ margin: '0', color: '#555' }}>Price: <span style={{ color: brandColor, fontWeight: 'bold' }}>${product.price}</span> | Remaining Stock: <strong style={{ color: product.stock > 0 ? 'green' : 'red' }}>{product.stock}</strong></p>
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