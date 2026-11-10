from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

DB_NAME = "database.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS registros (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()

init_db()

@app.route('/api/saludo', methods=['GET'])
def saludo():
    lang = request.args.get('lang', 'es')
    mensaje = "Conectado a Flask & SQLite 3" if lang == 'es' else "Connected to Flask & SQLite 3"
    return jsonify({"mensaje": mensaje})

@app.route('/api/datos', methods=['POST'])
def guardar_datos():
    data = request.get_json()
    nombre = data.get('nombre')
    if not nombre:
        return jsonify({"error": "El nombre es obligatorio"}), 400
    
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO registros (nombre) VALUES (?)", (nombre,))
    conn.commit()
    conn.close()
    
    return jsonify({"mensaje": "Guardado correctamente en SQL", "status": "ok"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)