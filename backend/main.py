from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import select
from models import *
from database import get_db
from auth import router as auth_router
from project import router as project_router
from character import router as character_router
from concept_art import router as concept_art_router
from dialog import router as dialog_router
from assets import router as assets_router

async def lifespan(_):
    database = get_db()
    await database.connect()
    yield
    await database.disconnect()
    
app = FastAPI(lifespan=lifespan)

app.include_router(auth_router)
app.include_router(project_router)
app.include_router(character_router)
app.include_router(concept_art_router)
app.include_router(dialog_router)
app.include_router(assets_router)
app.mount("/images", StaticFiles(directory="images"), name='images')

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/users/")
async def get_all_users():
    query = select(
        User
    )
    return await get_db().fetch_all(query)
    