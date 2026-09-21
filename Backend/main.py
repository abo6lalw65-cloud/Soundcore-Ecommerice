from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- نموذج بيانات التسجيل (Pydantic Model) ---
# هذا النموذج يحدد بدقة شكل البيانات التي سيُرسلها المستخدم عند إنشاء حساب جديد
class UserCreate(BaseModel):
    full_name: str
    email: str
    password: str
    role: str = "customer"  # القيمة الافتراضية للرتبة هي عميل، ويمكن أن تكون "seller"
    store_name: Optional[str] = None  # اسم المتجر مطلوب فقط إذا كان المستخدم بائعاً


# --- قواعد البيانات الوهمية (مع إمكانية التعديل عليها) ---

products_db = [
    {
        "id": 101, 
        "seller_id": 2, 
        "seller_name": "Audio Hub", 
        "name": "Soundcore C30i", 
        "price": 49.99, 
        "category": "Earbuds", 
        "stock": 5, 
        "image": "/images/c30i.png"
    },
    {
        "id": 102, 
        "seller_id": 2, 
        "seller_name": "Audio Hub", 
        "name": "Soundcore Q40i", 
        "price": 99.99, 
        "category": "Headphones", 
        "stock": 2, 
        "image": "/images/q40i.png"
    }
]

users_db = [
    {"id": 1, "full_name": "Admin User", "email": "admin@soundcore.com", "password": "123", "role": "admin"},
    {"id": 2, "full_name": "Audio Hub", "email": "seller@audiohub.com", "password": "123", "role": "seller", "store_name": "Audio Hub"},
    {"id": 3, "full_name": "Test Customer", "email": "customer@mail.com", "password": "123", "role": "customer"}
]

orders_db = [
    {
        "order_id": 501,
        "customer_id": 3,
        "total_amount": 149.98,
        "status": "pending",
        "items": [
            {"product_id": 101, "quantity": 1, "price": 49.99},
            {"product_id": 102, "quantity": 1, "price": 99.99}
        ]
    }
]

# --- المسارات (Endpoints) ---

@app.get("/")
def read_root():
    return {"message": "Welcome to Soundcore Backend API!"}

@app.get("/api/products")
def get_products():
    return products_db

@app.get("/api/users")
def get_users():
    return users_db

# --- مسار تسجيل حساب جديد (POST) ---
@app.post("/api/register")
def register_user(user: UserCreate):
    # 1. التأكد هل الإيميل مسجل مسبقاً أم لا
    for existing_user in users_db:
        if existing_user["email"] == user.email:
            raise HTTPException(status_code=400, status_email="Email already registered")
    
    # 2. إنشاء معرف جديد تلقائياً (رقم الـ ID التالي)
    new_id = len(users_db) + 1
    
    # 3. تجهيز بيانات المستخدم الجديد
    new_user = {
        "id": new_id,
        "full_name": user.full_name,
        "email": user.email,
        "password": user.password,  # ملاحظة: لاحقاً سنتعلم كيف نشفر كلمة المرور لأسباب أمنية
        "role": user.role,
        "store_name": user.store_name if user.role == "seller" else None
    }
    
    # 4. حفظ المستخدم في قاعدة البيانات المؤقتة
    users_db.append(new_user)
    
    return {
        "message": "User registered successfully!",
        "user": {
            "id": new_user["id"],
            "full_name": new_user["full_name"],
            "email": new_user["email"],
            "role": new_user["role"]
        }
    }

@app.get("/api/orders")
def get_orders():
    return orders_db