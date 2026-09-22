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

# Pydantic model for incoming registration data validation from frontend
class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str
    role: str = "customer"
    store_name: Optional[str] = None

# API Endpoint to fetch all registered users from the real database
@app.get("/api/users")
def get_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

# API Endpoint to register a new user and save them permanently in SQLite
@app.post("/api/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if the email is already registered in the database
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create a new user database record
    new_user = models.User(
        full_name=user.full_name,
        email=user.email,
        password=user.password,
        role=user.role,
        store_name=user.store_name if user.role == "seller" else None
    )
    
    # Save the user permanently into the SQLite database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {
        "message": "User registered successfully in SQLite Database!",
        "user": {
            "id": new_user.id,
            "full_name": new_user.full_name,
            "email": new_user.email,
            "role": new_user.role
        }
    }