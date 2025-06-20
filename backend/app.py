from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from routes.upload import upload

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://gabby:gabriel@localhost/gabflix_db'
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
app.register_blueprint(upload, url_prefix='/api')

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

@app.route('/')
def home():
    return jsonify({'message': "Welcome to the Gabflix API 🚀"})


if __name__ == '__main__':
    app.run(debug=True)
