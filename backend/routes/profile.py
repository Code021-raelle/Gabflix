from flask import Blueprint, request, jsonify
from models import Profile, User
from app import db
from flask_jwt_extended import jwt_required, get_jwt_identity


profile = Blueprint('profile', __name__)

@profile.route('/', methods=['GET'])
@jwt_required()
def get_profiles():
    user = User.query.get(get_jwt_identity())
    return jsonify([p.to_dict() for p in user.profiles]), 200

@profile.route('/', methods=['POST'])
@jwt_required()
def create_profile():
    user = User.query.get(get_jwt_identity())
    if len(user.profiles) >= 5:
        return jsonify({'msg': 'Profile limit reached'}), 400

    data = request.json
    profile = Profile(
        name=data['name'],
        avatar=data['avatar'],
        pin=data.get('pin'),
        user_id=user.id
    )
    db.session.add(profile)
    db.session.commit()
    return jsonify(profile.to_dict()), 201
