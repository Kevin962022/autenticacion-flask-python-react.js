"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

bcrypt = Bcrypt()
jwt = JWTManager()

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup_user():
    try:

        new_name = request.json.get('name')
        new_email = request.json.get('email')
        new_password = request.json.get('password')

        if not new_name or not new_email or not new_password:
            return jsonify({'error': 'name, email, and password are required'}), 400
        existing_user = User.query.filter_by(email = new_email).first()
        if existing_user:
            return jsonify({'error': 'Email already exists. Please try another one'}), 409

        pass_hash = bcrypt.generate_password_hash(new_password).decode('utf-8')

        new_user = User(name=new_name, email=new_email, password=pass_hash)
        db.session.add(new_user) 
        db.session.commit()
        return jsonify({"message": "User created successfully", "ok":True}), 201
    except Exception as e:
        return jsonify({'error': 'Internal server error', 'message': str(e)}), 500


@api.route('/login', methods=['POST'])
def login():
    try:

        email_user = request.json.get('email')
        pass_user = request.json.get('password')

        if not email_user or not pass_user:
            return jsonify({'error': 'Email and password are required'}), 400

        login_user = User.query.filter_by(email = email_user).one()
        if not login_user:
            return jsonify({'error': 'email not found'}), 404

        pass_hash_db = login_user.password
        result = bcrypt.check_password_hash(pass_hash_db, pass_user)
        if result:

            user_id = login_user.id
            access_token = create_access_token(identity = user_id) 
            return jsonify({'access_token': access_token, 'name':login_user.name, 'email':login_user.email}), 200
        else:
            return jsonify({'error': 'Incorrect password'}), 404
    except Exception as e:
        return jsonify({'error': 'Internal server error', 'message': str(e)}), 500


@api.route('/users')
@jwt_required()
def get_users_token():
    try:
        get_user_id = get_jwt_identity()
        if get_user_id:
            users = User.query.all()

            results = list(map(lambda item: item.serialize(), users))

            return jsonify({"users_list": results, "Number_of_users": len(results)}), 200
        
        return jsonify({'error': 'Users not found'}), 404
    except Exception as e:
        return jsonify({'error': 'Invalid token', 'message': str(e)}), 401