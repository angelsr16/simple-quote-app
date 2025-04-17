from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class Quote(BaseModel):
    id: Optional[str] = ""
    title: str
    content: str
    created_at: Optional[datetime] = datetime.now()
    updated_at: Optional[datetime] = datetime.now()
    author_username: Optional[str] = ""
