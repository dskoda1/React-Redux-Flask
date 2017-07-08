import json
from copy import deepcopy
from random import randint
from testing_config import BaseTestConfig
from application.urls import Urls
from application.models import User, Category
from application.utils import auth
from tests.helpers import \
    create_user, \
    create_categories, \
    APP_JSON

NUM_CATEGORIES = 5


class TestCategories(BaseTestConfig):
    category = {
        'data': {
            'name': 'testing_category'
        }
    }

    def _insert_categories(self, num_to_insert, user_id):
        cat_ids = []
        for i in range(num_to_insert):
            c = Category(
                name='category-{}-{}'.format(i, randint(0, 10000)),
                user_id=user_id
            )
            self.db.session.add(c)
            self.db.session.commit()
            cat_ids.append(c.id)
        return cat_ids

    def _additional_set_up(self):
        self.category['data']['user_id'] = self.user_id
        self.assertEqual(len(Category.query.all()), 0)

    def test_get_users_categories(self):
        self._additional_set_up()
        self._insert_categories(
            num_to_insert=NUM_CATEGORIES,
            user_id=self.user_id
        )

        # create another user and a category for it

        res = self.app.get(Urls.CATEGORIES, headers=self.headers)
        self.assertEqual(res.status_code, 200)
        # Should only be the 5 for our user
        self.assertEqual(len(Category.query.all()), NUM_CATEGORIES)
        [
            self.assertEqual(cat['user_id'], self.user_id)
            for cat in json.loads(res.data.decode())['result']
        ]

    def test_only_gets_authed_users_categories(self):
        self._additional_set_up()
        # Insert the first users categories
        self._insert_categories(
            num_to_insert=1,
            user_id=self.user_id
        )
        # Create another user and a category for it
        user_2_id, user_2_token = create_user(
            user_info={
                'email': 'xyz@gmail.com', 'password': 'toolzroolz'
            },
            app_client=self.app
        )
        self._insert_categories(
            num_to_insert=1,
            user_id=user_2_id
        )

        res = self.app.get(Urls.CATEGORIES, headers=self.headers)
        self.assertEqual(res.status_code, 200)
        # Should only be the 5 for our user
        [
            self.assertEqual(cat['user_id'], self.user_id)
            for cat in json.loads(res.data.decode())['result']
        ]

    def test_create_new_category(self):
        self._additional_set_up()

        res = self.app.post(
                    Urls.CATEGORIES,
                    headers=self.headers,
                    data=json.dumps(self.category),
                    content_type=APP_JSON
                )

        self.assertEqual(res.status_code, 201)
        self.assertEqual(Category.query.first().name, self.category['data']['name'])

    def test_create_duplicate_same_user_fails(self):
        self._additional_set_up()

        res_1 = self.app.post(
                    Urls.CATEGORIES,
                    headers=self.headers,
                    data=json.dumps(self.category),
                    content_type=APP_JSON
                )

        res_2 = self.app.post(
                    Urls.CATEGORIES,
                    headers=self.headers,
                    data=json.dumps(self.category),
                    content_type=APP_JSON
                )

        self.assertEqual(res_1.status_code, 201)
        self.assertEqual(res_2.status_code, 409)

    def test_delete_category(self):
        self._additional_set_up()
        # insert a single category and get it's id
        cat_id = self._insert_categories(1, self.user_id)[0]

        res = self.app.delete(
                Urls.CATEGORIES + '/{}'.format(cat_id),
                headers=self.headers
        )
        self.assertEqual(res.status_code, 200)
        categories = Category.query.filter_by(id=cat_id).all()
        self.assertEqual(len(categories), 0)

    def test_delete_category_doesnt_exist(self):
        self._additional_set_up()

        res = self.app.delete(
                Urls.CATEGORIES + '/10',
                headers=self.headers
        )
        self.assertEqual(res.status_code, 404)

    def test_cant_delete_others_category(self):
        self._additional_set_up()
        # Insert the first users categories
        self._insert_categories(
            num_to_insert=1,
            user_id=self.user_id
        )
        # Create another user and a category for it
        user_2_id, user_2_token = create_user(
            user_info={
                'email': 'xyz@gmail.com', 'password': 'toolzroolz'
            },
            app_client=self.app
        )
        cat_id = self._insert_categories(
            num_to_insert=1,
            user_id=user_2_id
        )[0]

        res = self.app.delete(
            Urls.CATEGORIES + '/{}'.format(cat_id),
            # this uses the first users auth
            headers=self.headers
        )

        self.assertEqual(res.status_code, 404)
