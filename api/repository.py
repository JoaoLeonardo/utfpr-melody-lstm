import requests
import psycopg2
from config import config
from flask import Response


def create_database():
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        sequence_ql = "CREATE SEQUENCE IF NOT EXISTS seq_melody START 1"
        cur.execute(sequence_ql)

        table_ql = "CREATE TABLE IF NOT EXISTS melody (id SERIAL PRIMARY KEY, melody TEXT, rating bool, genre smallint)"
        cur.execute(table_ql)

        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        raise Exception(error)
    finally:
        if conn is not None:
            conn.commit()
            conn.close()
    return

def request_melody(genre): 
    payload = {'genre': genre}
    response = requests.get('http://4107-35-233-144-153.ngrok.io/get-sample', params=payload)
    return Response(response.text, mimetype='text/plain')

def insert_melody(melody, rating):
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        query = "INSERT INTO melody VALUES (nextval('seq_melody'), %s, %s)"
        cur.execute(query, (melody, rating))
    except (Exception, psycopg2.DatabaseError) as error:
        raise Exception(error)
    finally:
        if conn is not None:
            conn.commit()
            conn.close()
