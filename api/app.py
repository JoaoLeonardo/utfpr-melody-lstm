# "venv\Scripts\activate" ativa o ambient virtual
# "flask run" roda o app.py

from flask import Flask, request
from repository import create_database, insert_melody

app = Flask(__name__)


@app.post("/melody")
def rate_melody():
    data = request.get_json()
    melody = data["melody"]
    rating = data["rating"]

    melody_id = insert_melody(melody, rating)
    return {"id": melody_id, "message": f"A avaliação da melodia {melody_id} foi salva com sucesso."}, 201


if __name__ == '__main__':
    create_database()
