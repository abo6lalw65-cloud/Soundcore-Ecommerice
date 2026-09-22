from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Define the SQLite database URL which will create a local file named soundcore.db
SQLALCHEMY_DATABASE_URL = "sqlite:///./soundcore.db"

# Create the SQLAlchemy engine for database connection
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create a localized session maker to handle database transactions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for declarative class definitions (models)
Base = declarative_base()