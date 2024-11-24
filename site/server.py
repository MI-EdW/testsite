# from flask import Flask, render_template, jsonify
# import random

# app = Flask(__name__)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('login')
# def generate_random():
#     # получить данные и если логин есть в accaunts.db то проверять пароль, если он тот же что и датабазе то отправлять данные аккаунта, если что-то не совпадает то отправить html ответ что лоигн и/или пароль неверны

# @app.route('register')
# def generate_random():
#     # должны быть получины данные и проверить есть ли логин в accaunts.db, если нет то создать новый аккаунт в accaunts иначе отправить html ответ о том что такой логин уже сущевствует

# if __name__ == '__main__':
#     app.run(host='192.168.0.53', port=5000, debug=True)

from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('databases/accaunts.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/app')
def main():
    return render_template('main.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    login = data['login']
    password = data['password']
    
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE login = ?", (login,)).fetchone()
    conn.close()
    
    if user and user['password'] == password:
        return jsonify({"status": "success", "message": "Login successful", "user_data": dict(user)})
    else:
        return jsonify({"status": "error", "message": "Неверный логин или пароль"})

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    login = data['login']
    password = data['password']

    if login == '' or password == '':
        return jsonify({"status": "error", "message": "логин или пароль не могут быть пустыми"})
    
    conn = get_db_connection()
    existing_user = conn.execute("SELECT * FROM users WHERE login = ?", (login,)).fetchone()
    
    if existing_user:
        conn.close()
        return jsonify({"status": "error", "message": "Такой логин уже существует"})
    
    conn.execute("INSERT INTO users (login, password) VALUES (?, ?)", (login, password))
    conn.commit()
    conn.close()
    
    return jsonify({"status": "success", "message": "Registration successful"})

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
