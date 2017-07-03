from flask import request, jsonify, g
from application.models import Category
from index import app, db
from sqlalchemy.exc import IntegrityError
from application.utils.auth import requires_auth

def cat_helper(cat):
    return {
        'name': cat,
        'id': ++id
    }

@app.route('/api/categories', methods=['GET'])
@requires_auth
def get_categories():
    # TODO: Get just the users categories
    cats = Category.query.all()
    return jsonify(result=[category.json() for category in cats])


@app.route('/api/category', methods=['POST'])
@requires_auth
def create_category():
    incoming = request.get_json()

    category = Category(
        name=incoming['data']['name'],
        user_id=g.current_user['id']
    )
    db.session.add(category)
    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message='Category unable to be created')

    return jsonify({}), 201
