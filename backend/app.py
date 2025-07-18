from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate


db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://gabby:gabriel@localhost/gabflix_db'
    app.config['JWT_SECRET_KEY'] = 'your_secret_key'

    db.init_app(app)
    jwt.init_app(app)
    CORS(app)
    migrate.init_app(app, db)

    from routes.upload import upload
    from models import User, Movie, Test
    app.register_blueprint(upload, url_prefix='/api')


    @app.route('/')
    def home():
        return jsonify({'message': "Welcome to the Gabflix API 🚀"})

    return app
