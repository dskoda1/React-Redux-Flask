import json

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
