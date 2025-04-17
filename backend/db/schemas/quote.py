def quote_schema(quote) -> dict:
    return {
        "id": str(quote["_id"]),
        "title": quote["title"],
        "content": quote["content"],
        "created_at": quote["created_at"].isoformat(),
        "author_username": quote["author_username"],
    }


async def quotes_schema(quotes) -> list:
    quotes_list = []
    async for current_quote in quotes:
        quote = quote_schema(current_quote)
        quotes_list.append(quote)
    return quotes_list
