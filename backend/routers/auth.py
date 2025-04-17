from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from db.config.database import db
from db.models.user import UserDB, UserRegister
from jose import JWTError, jwt

from config import SECRET_KEY

router = APIRouter()

collection = db["users"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = SECRET_KEY
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


@router.post("/register_user")
async def register_user(user: UserRegister):
    find_user = await collection.find_one({"username": user.username})
    if find_user:
        raise HTTPException(status_code=400, detail="Username already registered!")

    hashed_pw = pwd_context.hash(user.password)

    user_db = {
        "username": user.username,
        "hashed_password": hashed_pw,
    }
    await collection.insert_one(user_db)

    access_token = create_access_token(data={"sub": user_db["username"]})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user_db["username"],
    }


@router.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    print("Received form data:", form_data.username, form_data.password)
    user = await collection.find_one({"username": form_data.username})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    if not pwd_context.verify(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    access_token = create_access_token(data={"sub": user["username"]})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "username": user["username"],
    }


@router.get("/verify-token")
async def verify_user_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        return payload
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")


def create_access_token(data: dict):
    to_encode = data.copy()
    # expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    # to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
