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

        table_ql = "CREATE TABLE IF NOT EXISTS melody (id SERIAL PRIMARY KEY, melody TEXT, sequence TEXT, rating bool, genre smallint)"
        cur.execute(table_ql)
        
        table_ql = "CREATE TABLE IF NOT EXISTS aiurl (url TEXT PRIMARY KEY)"
        cur.execute(table_ql)

        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        raise Exception(error)
    finally:
        if conn is not None:
            conn.commit()
            conn.close()
    return

def get_ai_connection(): 
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        cur.execute('SELECT * FROM aiurl;')
        ai_conection = cur.fetchone()

        cur.close()
        return ai_conection[0]
    except (Exception, psycopg2.DatabaseError) as error:
        raise Exception(error)
    finally:
        if conn is not None:
            conn.close()
    return

def request_melody(genre): 
    payload = {'genre': genre}
    response = requests.get(get_ai_connection()+'/get-sample', params=payload)
    return Response(response.text, mimetype='text/plain')

def insert_melody(melody, sequence, rating, genre):
    conn = None
    try:
        params = config()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        query = "INSERT INTO melody VALUES (nextval('seq_melody'), %s, %s, %s, %s)"
        cur.execute(query, (melody, sequence, rating, genre))
    except (Exception, psycopg2.DatabaseError) as error:
        raise Exception(error)
    finally:
        if conn is not None:
            conn.commit()
            conn.close()
