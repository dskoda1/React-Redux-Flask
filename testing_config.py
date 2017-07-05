import json
import os
os.environ['TESTING'] = 'true'

from flask_testing import TestCase

from setup import basedir
from index import app, db
from application.models import User
from tests.helpers import create_user


class BaseTestConfig(TestCase):
    default_user = {
        "email": "default@gmail.com",
        "password": "something2"
    }


    def create_app(self):
        app.config.from_object('config.TestingConfig')
        return app

    def setUp(self):
        self.app = app.test_client()
        self.db = db
        self.db.create_all()
        # Safety check. TODO: remove this?
        self.assertEqual(len(User.query.all()), 0)
        # Create the user and cache id, token, and headers
        self.user_id, self.token = create_user(
            user_info=self.default_user,
            app_client=self.app
        )
        self.headers = {
                'Authorization': self.token,
            }

    def tearDown(self):
        db.session.remove()
        db.drop_all()
