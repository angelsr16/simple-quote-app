from datetime import datetime
import json
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from db.config.database import db
from db.models.quote import Quote
from db.schemas.quote import quotes_schema, quote_schema
from pymongo.errors import PyMongoError

from routers.auth import verify_user_token

router = APIRouter()

collection = db["quotes"]

quotes_cache = []


async def update_quotes_cache():
    global quotes_cache
    quotes = collection.find().sort("created_at", -1)
    quotes_cache = await quotes_schema(quotes)


async def startup():
    await update_quotes_cache()
    print("Quotes cache initialized.")


@router.websocket("/quotes_socket")
async def websocket_quotes(websocket: WebSocket):
    await websocket.accept()

    await websocket.send_text(json.dumps(quotes_cache))

    async with collection.watch() as stream:
        async for change in stream:
            await update_quotes_cache()
            await websocket.send_text(json.dumps(quotes_cache))


@router.get("/quotes", response_model=list[Quote], status_code=200)
async def get_quotes():
    cursor = collection.find()
    quotes_list = await quotes_schema(cursor)
    return quotes_list


@router.post("/quotes", response_model=Quote, status_code=200)
async def post_quote(quote: Quote, current_user: dict = Depends(verify_user_token)):
    try:
        quote.author_username = current_user.get("sub")
        quote_dict = dict(quote)
        del quote_dict["id"]
        result = await collection.insert_one(quote_dict)
        inserted_quote = await collection.find_one({"_id": result.inserted_id})

        return Quote(**quote_schema(inserted_quote))
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/quotes/{id}", response_model=Quote, status_code=200)
async def put_quote(id: str, quote: Quote):
    quote_dict = dict(quote)
    del quote_dict["id"]
    del quote_dict["created_at"]

    quote_dict["updated_at"] = datetime.now()
    try:
        updated_quote = await collection.find_one_and_update(
            {"_id": ObjectId(id)},
            {"$set": quote_dict},
            return_document=True,
        )

        return Quote(**quote_schema(updated_quote))
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/quotes/{id}", status_code=200)
async def delete_quote(id: str):
    print("try to delete")
    try:
        result = await collection.find_one_and_delete({"_id": ObjectId(id)})
        if result:
            return {"message": "Quote deleted", "id": str(id)}
        raise HTTPException(status_code=404, detail="Quote not found")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid ID")
