# "venv\Scripts\activate" ativa o ambient virtual
# "flask run" roda o app.py

from flask import Flask, request
from flask_cors import CORS
from repository import create_database, insert_melody

app = Flask(__name__)
CORS(app)
create_database()

@app.post("/rate-melody")
def rate_melody():
    data = request.get_json()
    melody = data["melody"]
    rating = data["rating"]

    insert_melody(melody, rating)
    return {"message": f"A avaliação da melodia foi salva com sucesso."}, 201

