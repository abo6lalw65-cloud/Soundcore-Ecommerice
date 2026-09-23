from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from sqlalchemy.orm import Session

# Import database session, engine, and models
from database import engine, SessionLocal, Base
import models

# Automatically create database tables if they do not exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Enable CORS middleware to allow communication with the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session for each request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- Pydantic Models for Data Validation ---

class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str
    role: str = "customer"
    store_name: Optional[str] = None

class UserLogin(BaseModel):
    email: str
    password: str

class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    stock: int
    image: Optional[str] = None
    seller_id: int


# --- User & Authentication Endpoints ---

# API Endpoint to fetch all registered users from the database
@app.get("/api/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

# API Endpoint to register a new user permanently in SQLite
@app.post("/api/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = models.User(
        full_name=user.full_name,
        email=user.email,
        password=user.password,
        role=user.role,
        store_name=user.store_name if user.role == "seller" else None
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "message": "User registered successfully in SQLite Database!",
        "user": {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email,
            "role": new_user.role,
            "store_name": new_user.store_name
        }
    }

# API Endpoint for User Login checking against the database
@app.post("/api/login")
def login_user(credentials: UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == credentials.email).first()
    if not user or user.password != credentials.password:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    return {
        "message": "Login successful",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role,
            "store_name": user.store_name
        }
    }


# --- Product & Inventory Endpoints ---

# API Endpoint to fetch all products from the SQLite database
@app.get("/api/products")
def get_products(db: Session = Depends(get_db)):
    products = db.query(models.Product).all()
    result = []
    for prod in products:
        result.append({
            "id": prod.id,
            "name": prod.name,
            "category": prod.category,
            "price": prod.price,
            "stock": prod.stock,
            "image": prod.image,
            "seller_id": prod.seller_id,
            "seller_name": prod.owner.store_name if prod.owner else "Unknown"
        })
    return result

# API Endpoint to add a new product to the database
@app.post("/api/products")
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    seller = db.query(models.User).filter(models.User.id == product.seller_id).first()
    if not seller or seller.role != "seller":
        raise HTTPException(status_code=400, detail="Invalid seller ID or user is not a seller")

    new_product = models.Product(
        name=product.name,
        category=product.category,
        price=product.price,
        stock=product.stock,
        image=product.image,
        seller_id=product.seller_id
    )
    
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    
    return {"message": "Product added successfully", "product": new_product}

# API Endpoint to delete a product by ID from the database
@app.delete("/api/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(product)
    db.commit()
    return {"message": "Product deleted successfully"}