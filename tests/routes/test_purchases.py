import json
from copy import deepcopy
from application.urls import Urls
from testing_config import BaseTestConfig
from application.models import User, Category
from application.utils import auth
from tests.helpers import \
    create_user, \
    create_categories, \
    APP_JSON


class TestPurchases(BaseTestConfig):
    purchase = {
        'data': {
            'name': 'food'
        }
    }

    def _additional_set_up(self):
        self.cat_id = create_categories(
            db=self.db,
            user_id=self.user_id,
            num_to_insert=1
        )[0]
        self.purchase['data']['category_id'] = self.cat_id

    def test_create_purchase(self):
        self._additional_set_up()

        res = self.app.post(
            Urls.PURCHASES,
            headers=self.headers,
            data=json.dumps(self.purchase),
            content_type=
        )
