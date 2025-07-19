import os
from flask import Blueprint, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Movie, User
from app import db

upload = Blueprint('upload', __name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'}

# Ensure uploads directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@upload.route('/upload_movie', methods=['POST'])
@jwt_required()
def upload_file():
    user_id = get_jwt_identity()  # Get the user ID from the JWT token
    user = User.query.get(user_id)

    if not user or not user.is_admin:
        return jsonify({'error': 'Admin access required'}), 403

    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']

    title = request.form.get('title')
    description = request.form.get('description')
    category = request.form.get('category')
    video_url = request.files.get('video_url')
    thumbnail_path = request.files.get('thumbnail_path')

    if not title or not description:
        return jsonify({'error': 'Title and description are required'}), 400
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed'}), 400
    
    # Save the file securely  
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)

    # Use `current_app.extensions["sqlalchemy"].db` to get db
    from flask import current_app
    db = current_app.extensions['sqlalchemy'].db

    # Save movie metadata to the database
    new_movie = Movie(title=title, description=description, video_url=video_url, thumbnail_path=thumbnail_path, category=category)
    db.session.add(new_movie)
    db.session.commit()

    return jsonify({
        'message': 'Movie uploaded and saved successfully',
        'movie': {
            'id': new_movie.id,
            'title': new_movie.title,
            'description': new_movie.description,
            'video_url': new_movie.video_url
        }
    }), 201
    

@upload.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
