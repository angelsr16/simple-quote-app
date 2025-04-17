from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, quotes
from routers.quotes import startup

from dotenv import load_dotenv
load_dotenv()

print("TEST")

@asynccontextmanager
async def lifespan(app: FastAPI):
    await startup()
    yield
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)

app.include_router(auth.router)
app.include_router(quotes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World."}
