from flask import Blueprint, jsonify, request
from app import db
from models import User
from flask_jwt_extended import create_access_token

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400
    if 'password' not in data or len(data['password']) < 6:
        return jsonify({'message': 'Password must be at least 6 characters long'}), 400
    if 'email' not in data:
        return jsonify({'message': 'Email is required'}), 400
    if len(data['email']) < 5 or len(data['email']) > 120:
        return jsonify({'message': 'Email must be between 5 and 120 characters long'}), 400
    if not data['password'] or not isinstance(data['password'], str):
        return jsonify({'message': 'Password cannot be empty and must be a string'}), 400
    if not data['email'].count('@') == 1 or not data['email'].count('.') >= 1:
        return jsonify({'message': 'Email must contain exactly one "@" and at least one "."'}), 400
    
    new_user = User(email=data['email'])
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Email and password are required'}), 400
    
    email = data['email'].strip()
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        token = create_access_token(identity={'id': user.id, 'username': user.username})
        return jsonify({'token': token}), 200
    
    return jsonify({'message': 'Invalid credentials'}), 401
