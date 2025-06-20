from flask import Blueprint, jsonify, request
from app import db
from models import Movie
from flask_jwt_extended import jwt_required

movies = Blueprint('movies', __name__)


@movies.route('/movies', methods=['GET'])
def get_movies():
    """Fetch all movies."""
    all_movies = Movie.query.all()
    result = [{'id': m.id, 'title': m.title, 'description': m.description,
               'release_year': m.release_year, 'genre': m.genre, 'video_url': m.video_url} for m in all_movies]
    return jsonify(result)

@movies.route('/movies', methods=['POST'])
@jwt_required()
def add_movie():
    """Add a new movie."""
    data = request.get_json()
    if not data or not all(k in data for k in ('title', 'release_year', 'genre')):
        return jsonify({'message': 'Missing required fields'}), 400

    new_movie = Movie(
        title=data['title'],
        description=data.get('description', ''),
        release_year=data['release_year'],
        genre=data['genre'],
        video_url=data.get('video_url', '')
    )
    
    db.session.add(new_movie)
    db.session.commit()
    
    return jsonify({'message': 'Movie added successfully', 'id': new_movie.id}), 201
