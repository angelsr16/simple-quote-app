from typing import Optional
from pydantic import BaseModel


class UserRegister(BaseModel):
    username: str
    password: str


class UserDB(BaseModel):
    id: Optional[str] = ""
    username: str
    hashed_password: str
