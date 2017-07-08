import json

from application.models import Category

APP_JSON = 'application/json'



def create_user(user_info, app_client):
    """
    Create a user, providing back the id and the token.
    @param user_dict: dictionary with email and password
    @param app_client: a Flask app client to create against
    @returns user_id, token for newly created user
    """
    res = app_client.post(
            '/api/create_user',
            data=json.dumps(user_info),
            content_type='application/json'
    )
    res = json.loads(res.data.decode("utf-8"))
    return res['id'], res['token']


def create_categories(db, user_id, num_to_insert):
    cat_ids = []
    for i in range(num_to_insert):
        c = Category(
            name='category-{}-{}'.format(i, randint(0, 10000)),
            user_id=user_id
        )
        db.session.add(c)
        db.session.commit()
        cat_ids.append(c.id)
    return cat_ids
