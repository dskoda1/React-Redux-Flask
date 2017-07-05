from flask import request, jsonify, g
from application.models import Category
from index import app, db
from sqlalchemy.exc import IntegrityError
from application.utils import Http, requires_auth

def cat_helper(cat):
    return {
        'name': cat,
        'id': ++id
    }

@app.route('/api/categories', methods=[Http.GET])
@requires_auth
def get_categories():
    cats = Category.get_user_categories(user_id=g.current_user['id'])
    return jsonify(result=[category.attr() for category in cats]), 200


@app.route('/api/categories', methods=[Http.POST])
@requires_auth
def create_category():
    incoming = request.get_json()
    name = incoming['data']['name']
    # TODO: Make this be a database level constraint
    users_current_categories = Category.get_user_categories(user_id=g.current_user['id'])
    if name in [cat.name for cat in users_current_categories]:
        return jsonify(message='Category already exists for user'), 409

    category = Category(
        name=name,
        user_id=g.current_user['id']
    )
    db.session.add(category)
    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message='Category unable to be created'), 409

    return jsonify({}), 201

@app.route('/api/categories/<category_id>', methods=[Http.DELETE])
@requires_auth
def delete_category(category_id):

    category = Category.query.filter_by(
                    user_id=g.current_user['id'],
                    id=category_id
                ).first()
    if not category:
        return jsonify(message='Category not found'), 404

    db.session.delete(category)
    db.session.commit()
    return jsonify({}), 200
