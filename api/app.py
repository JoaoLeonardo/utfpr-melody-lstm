# "venv\Scripts\activate" ativa o ambient virtual
# "flask run" roda o app.py

from flask import Flask, request
from flask_cors import CORS
from repository import create_database, insert_melody, request_melody

app = Flask(__name__)
CORS(app)
create_database()

@app.post("/rate-melody")
def rate_melody():
    data = request.get_json()
    melody = data["melody"]
    sequence = data["sequence"]
    rating = data["rating"]
    genre = data["genre"]

    insert_melody(melody, sequence, rating, genre)
    return {"message": f"A avaliação da melodia foi salva com sucesso."}, 201

@app.route("/generate-melody", methods=['GET'])
def generate_melody():
    genre = request.args.get('genre')
    return request_melody(genre)

